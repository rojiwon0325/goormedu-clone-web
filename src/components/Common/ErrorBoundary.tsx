import React from "react";
import { Helmet } from "react-helmet-async";

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>
> {
  state: { hasError: boolean };
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <div className="hwfull flex-center">
          <Helmet>
            <title>GoormEdu | Error</title>
          </Helmet>
          <h1 className="font-NanumSquareRoundBold">
            서버가 불안정합니다. 나중에 다시 이용해주세요.
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
