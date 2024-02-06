import ReactLoading from "react-loading";

export const Loading = () => {
    return (
        <ReactLoading
            type={"spin"}
            color={"white"}
            height={"100%"}
            width={"100%"}
            className="loading"
        />
    );
};
