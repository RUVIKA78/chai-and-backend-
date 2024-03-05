import {asyncHandler} from "../utils/asynchandler.js"
import { ErrorHandler } from "../utils/error.js"
import { User } from "../models/user.js"
import {uploadCloud} from "../utils/cloudinary.js"
import {Response} from "../utils/response.js"

const register = asyncHandler(async (req, res, next) => {
    //get user details from frontend
    const { fullname, username, email, password } = req.body
    console.log("email:",email)
    
    //validation
    if (fullname === "") {
        throw new ErrorHandler(400, "fullname is required")
    }
    if (
        [fullname, email, username, password].some((field) =>
        field?.trim()==="")
    ) {
        throw new ErrorHandler(400, "all fields are required")
    }


    //check if user already exists
    const existedUser = User.findOne({
    $or:[{username}, {email}]
    })
    if (existedUser) {
        throw new ErrorHandler(409,"user already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

   
    //check for images, avatar
    if (!avatarLocalPath) {
        throw new ErrorHandler(400,"avatar file is required!")
    }
    
    //upload them to cloudinary

    const avatar = await uploadCloud(avatarLocalPath)
    const coverImage = await uploadCloud(coverImageLocalPath)
    
    if (!avatar) {
        throw new ErrorHandler(400,"avatar file is required!")
    }
    //create user object-create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        usernmae: username.toLowerCase()
    })
        //remove password and refresh token from response

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
        //check the response, user is created or not

    if (!createdUser) {
        throw new ErrorHandler(500,"something went wrong while signing in")
    }
        //return res

    return res.status(201).json(
    new Response(200,createdUser,"user regsitered !")
)


   
})

export {register}