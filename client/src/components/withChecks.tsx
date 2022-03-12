import React from "react";
import Message from "./Message";
import Spinner from "./Spinner";

interface IChecks<DataType> {
  isLoading: boolean;
  isError: boolean;
  message?: string;
  data: DataType[] | null;
}

interface IWrapp<DataType> {
  data: DataType[];
}

const withChecks = <DataType, ChecksType extends IChecks<DataType>>(
  WrappedComponent: React.ComponentType<IWrapp<DataType>>
) => {
  return ({ isLoading, isError, data, message, ...others }: ChecksType) => {
    if (isLoading) {
      return <Spinner />;
    }

    // handle server error or server is down

    if (isError) {
      return (
        <Message error>
          Sorry, Our server is down please try again later :(
        </Message>
      );
    }

    // if there's no data don't show any thing else check for arr length
    return !data ? null : data.length ? (
      <WrappedComponent data={data} {...others} />
    ) : (
      <Message>{message ? message : "There's nothing to show yet."}</Message>
    );
  };
};

export default withChecks;
