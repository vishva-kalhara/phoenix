import { Button } from "@/components/ui/button";
import { revokeAccessToken, setAccessToken } from "@/state/slices/auth-slice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

const DemoRedux = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <section>
            {token ? (
                <Button onClick={() => dispatch(revokeAccessToken())}>
                    token: {token} | Sign out
                </Button>
            ) : (
                <Button
                    onClick={() => dispatch(setAccessToken("custom token"))}
                >
                    Sign In
                </Button>
            )}
        </section>
    );
};

export default DemoRedux;
