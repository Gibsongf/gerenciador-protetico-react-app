import ReactLoading from "react-loading";

export const Loading = () => {
    return (
        <ReactLoading
            type={"spin"}
            color={"white"}
            height={"10%"}
            width={"10%"}
            className="loading"
        />
    );
};
