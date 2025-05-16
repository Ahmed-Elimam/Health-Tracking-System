const { createSpecialization } = require('../factories/specializationFactory');
const dbConnect = require('../config/dbConnection'); // Your DB connection logic

const specializations = [
    'Cardiology',
    'Dermatology',
    'Gynecology',
    'Neurology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Urology',
    'Otolaryngology',
    'Anesthesiology',
    'Endocrinology',
    'Hematology',
    'Infectious Diseases',
    'Nephrology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Pulmonary Medicine',
    'Rheumatology',
    'Sports Medicine',
    'Vascular Surgery',
];

async function seed() {
    await dbConnect();
    for (let i = 0; i < specializations.length; i++) {
        await createSpecialization({ name: specializations[i] });
    }
    console.log('Specializations seeded!');
    process.exit();
}

seed();
