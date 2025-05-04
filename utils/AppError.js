// class AppError extends Error {
//     constructor(message, statusCode = 500, errors = []) {
//         super(message);
//         this.statusCode = statusCode; // Default to 500 if no status code is provided
//         this.errors = errors; // Default to null if no errors are provided
//     } 
// }

// module.exports = AppError;

// Example usage in an Express route handler or controller:
// const AppError = require('./AppError'); // adjust path as needed

// app.get('/user', async (req, res, next) => {
//     try {
//         const someCondition = await checkSomeCondition();
//         if (!someCondition) {
//             throw new AppError('Custom error message', 400, ['Error detail 1', 'Error detail 2']);
//         }
//         res.send('All good!');
//     } catch (err) {
//         next(err); // Pass error to Express error-handling middleware
//     }
// });

