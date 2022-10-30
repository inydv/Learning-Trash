import { axiosJWT, publicRequest } from "./requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_TOKENTIME } from "./redux/user/userApiCall"

function Interceptor() {

    const dispatch = useDispatch();
    const { tokenTime, currentUser } = useSelector((state) => state.user);

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date(Date.now());
            if (tokenTime < currentDate.getTime() && currentUser) {
                const res = await publicRequest.post("/refresh");
                dispatch(CHANGE_TOKENTIME(res.data.TokenDate));
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (<></>)
}

export default Interceptor