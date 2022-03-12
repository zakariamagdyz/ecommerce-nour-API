import { ReactNode, Component, ErrorInfo } from "react";
import Error from "./Error";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}
export default class ErrorBoundry extends Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.log(err, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error
          message="Sorry this page is broken"
          imageUrl="https://i.imgur.com/yW2W9SC.png"
        />
      );
    }

    return this.props.children;
  }
}
