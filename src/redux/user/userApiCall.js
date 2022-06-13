import { Update_Profile_Request, Update_Profile_Success, Update_Profile_Fail, Update_isUpdated, Update_Password_Request, Update_Password_Success, Update_Password_Fail } from "./userRedux";
import { publicRequest } from "../../requestMethods";

export const updateProfile = (userData) => async (dispatch) => {
    dispatch(Update_Profile_Request());
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await publicRequest.put("/me/update", userData, config);
        dispatch(Update_Profile_Success(res.data));
    } catch (error) {
        dispatch(Update_Profile_Fail(error.response.data.message));
    }
};

export const updateIsUpdated = (dispatch) => {
    dispatch(Update_isUpdated());
}

export const updatePassword = (password) => async (dispatch) => {
    dispatch(Update_Password_Request());
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await publicRequest.put("/password/update", password, config);
        dispatch(Update_Password_Success(res.data));
    } catch (error) {
        dispatch(Update_Password_Fail(error.response.data.message));
    }
};