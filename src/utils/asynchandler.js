// const asyncHandler = (func) => async (req, res, next) => {
//     try {

//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: true,
//             message: err.message
//         })
//     }
// }

const asyncHandler = () => {
    return (req, res, next) => {
        Promise.resolve(requestHnadler(req,res,next)).catch((err)=>next(err))
    }
}


export { asyncHandler }
