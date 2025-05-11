const PrescriptionService = require('../services/prescriptions.service.js');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync.js');

exports.createPrescription = catchAsync( async (req, res, next) => {
    const { doctorId, patientId, checkupId, treatments, date } = req.body;
    const user = req.user;

    if (!treatments || !Array.isArray(treatments)) {
      return next(new AppError("Treatments must be an array", 400));
    }

    if (user.role === 'patient') {
      if (user.patientId !== patientId) {
        return next(new AppError("You can only create prescriptions for yourself", 403));
      }
    }

    if (user.role === 'doctor') {
      if (user.doctorId !== doctorId) {
        return next(new AppError("Invalid doctor ID", 403));
      }

      const isTreating = await PrescriptionService.checkDoctorTreatsPatient(doctorId, patientId);
      if (!isTreating) {
        return next(new AppError("You are not currently assigned to treat this patient", 403));
      }
    }

    const prescriptionData = {
      createdBy: user.id,
      doctorId,
      patientId,
      checkupId,
      date,
      treatments
    };

    const newPrescription = await PrescriptionService.createPrescription(prescriptionData);
    res.status(201).json(newPrescription);
});

exports.getPrescriptions = catchAsync(async (req, res, next) => {
    const user = req.user;
    let prescriptions;

    if (user.role === 'patient') {
      prescriptions = await PrescriptionService.getPatientPrescriptions(user.patientId);
    } else if (user.role === 'doctor') {
      prescriptions = await PrescriptionService.getAllDoctorPrescriptions(user.doctorId, user.id);
    } else if (user.role === 'admin' || user.role === "super-admin") {
      prescriptions = await PrescriptionService.getAllPrescriptions();
    } else {
      return next(new AppError("Unauthorized", 403));
    }
    
    res.status(200).json(prescriptions);
});



exports.getPrescription = catchAsync(async (req, res, next) => {
    const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
    
    if (!prescription) {
      return next(new AppError("Prescription not found", 404));
    }
    
    const user = req.user;
    
    if (user.role === "doctor" && prescription.doctorId.toString() !== user.doctorId.toString()) {
      const treating = await PrescriptionService.checkDoctorTreatsPatient(
        user.doctorId, 
        prescription.patientId
      );
      
      if (!treating) {
        return next(new AppError("Access denied", 403));
      }
    }
    
    if (user.role === "patient" && prescription.patientId.toString() !== user.patientId.toString()) {
      return next(new AppError("Access denied", 403));
    }
    
    res.status(200).json(prescription);
});

exports.updatePrescription =catchAsync( async (req, res, next) => {
    const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
    
    if (!prescription) {
      return next(new AppError("Prescription not found", 404));
    }
    
    const user = req.user;
    
    if (user.role === 'patient') {
      if (prescription.createdBy.toString() !== user.id.toString()) {
        return next(new AppError("Access denied - you can only update prescriptions created by you", 403));
      }
      
      const hoursDifference = await PrescriptionService.getPrescriptionCreatedTime(prescription);
      
      if (hoursDifference > 48) {
        return next(new AppError("Cannot update prescription after 48 hours of creation", 403));
      }
    } else if (user.role === 'doctor') {
      return next(new AppError("Doctors are not allowed to edit prescriptions", 403));
    } else if (user.role !== 'admin' && user.role !== 'super-admin') {
      return next(new AppError("Unauthorized", 403));
    }
    
    const updatedPrescription = await PrescriptionService.updatePrescription(req.params.id, req.body);
    
    res.status(200).json(updatedPrescription);

});

exports.deletePrescription = catchAsync( async (req, res, next) => {
    const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
    
    if (!prescription) {
      return next(new AppError("Prescription not found", 404));
    }
    
    const user = req.user;
    
    if (user.role !== 'admin' && user.role !== 'super-admin') {
      return next(new AppError("Only administrators can delete prescriptions", 403));
    }
    
    await PrescriptionService.deletePrescription(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
});