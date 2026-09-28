const errorMiddleware = (err,req,res,next) => {

    if (err.name === "ValidationError") {

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map(error => error.message)//err.erros is object
        });
    }


    if (err.code === 11000) {

        return res.status(409).json({
            success: false,
            message: "Duplicate value"
        });
    }


    if (err.name === "CastError") {

        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    if (err.name === "TokenExpiredError") {
        if (req.originalUrl?.includes("/refresh")) {
            res.clearCookie("refreshtoken", { httpOnly: true });
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again."
            });
        }
        return res.status(401).json({
            success: false,
            message: "Access token expired"
        });
    }

    if (err.name === "JsonWebTokenError") {
        res.clearCookie("refreshtoken", { httpOnly: true });
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please log in again."
        });
    }

    // Custom appError
    return res.status(err.statusCode || 500).json({

        success: false,

        message:
            err.message ||
            "Internal Server Error"
    });
};

export default errorMiddleware;