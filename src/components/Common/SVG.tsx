import React from "react";

export type SVGName =
  | "bell"
  | "cap"
  | "search"
  | "shopping-bag"
  | "shopping-cart"
  | "person"
  | "person-black"
  | "square-four"
  | "settings"
  | "checklist"
  | "monitor"
  | "document"
  | "check-circle"
  | "menu";

const SVG: React.FC<
  { name: SVGName } & React.HTMLAttributes<HTMLDivElement>
> = ({ name, ...rest }) => {
  switch (name) {
    case "bell":
      return (
        <Wrap {...rest}>
          <Bell />
        </Wrap>
      );
    case "cap":
      return (
        <Wrap {...rest}>
          <Cap />
        </Wrap>
      );
    case "person":
      return (
        <Wrap {...rest}>
          <Person />
        </Wrap>
      );
    case "person-black":
      return (
        <Wrap {...rest}>
          <PersonBlack />
        </Wrap>
      );
    case "search":
      return (
        <Wrap {...rest}>
          <Search />
        </Wrap>
      );
    case "shopping-bag":
      return (
        <Wrap {...rest}>
          <ShoppingBag />
        </Wrap>
      );
    case "shopping-cart":
      return (
        <Wrap {...rest}>
          <ShoppingCart />
        </Wrap>
      );
    case "square-four":
      return (
        <Wrap {...rest}>
          <SquareFour />
        </Wrap>
      );
    case "settings":
      return (
        <Wrap {...rest}>
          <Settings />
        </Wrap>
      );
    case "checklist":
      return (
        <Wrap {...rest}>
          <CheckList />
        </Wrap>
      );
    case "monitor":
      return (
        <Wrap {...rest}>
          <Monitor />
        </Wrap>
      );
    case "document":
      return (
        <Wrap {...rest}>
          <Document />
        </Wrap>
      );
    case "check-circle":
      return (
        <Wrap {...rest}>
          <CheckCircle />
        </Wrap>
      );
    case "menu":
      return (
        <Wrap {...rest}>
          <Menu />
        </Wrap>
      );
    default:
      return null;
  }
};

export default React.memo(SVG);

const Wrap: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => (
  <div {...rest} className={"flex-center " + rest.className}>
    {children}
  </div>
);

const Bell = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <path
        d="M23.608,17.013l-2.8-10.1A9.443,9.443,0,0,0,2.486,7.4L.321,17.14a2.5,2.5,0,0,0,2.441,3.042H6.905a5.285,5.285,0,0,0,10.154,0H21.2a2.5,2.5,0,0,0,2.409-3.169Zm-20.223.169,2.03-9.137a6.443,6.443,0,0,1,12.5-.326l2.628,9.463Z"
        fill="#ffffff"
        data-original="#000000"
      />
    </g>
  </svg>
);

const Cap = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <path
        d="m24 8.48v11.52a1 1 0 0 1 -2 0v-8.248l-7.4 3.536a5 5 0 0 1 -2.577.694 5.272 5.272 0 0 1 -2.7-.739l-7.38-3.513a3.691 3.691 0 0 1 -.084-6.455c.027-.016.056-.031.084-.045l7.457-3.558a5.226 5.226 0 0 1 5.282.045l7.375 3.513a3.767 3.767 0 0 1 1.943 3.25zm-11.978 9.5a7.26 7.26 0 0 1 -3.645-.972l-4.377-2.089v2.7a5.007 5.007 0 0 0 3.519 4.778 15.557 15.557 0 0 0 4.481.603 15.557 15.557 0 0 0 4.481-.607 5.007 5.007 0 0 0 3.519-4.778v-2.691l-4.459 2.13a6.983 6.983 0 0 1 -3.519.928z"
        fill="#609ae9"
        data-original="#000000"
      />
    </g>
  </svg>
);

const Person = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <g>
        <circle
          cx="256"
          cy="128"
          r="128"
          fill="#ffffff"
          data-original="#000000"
        />
        <path
          d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z"
          fill="#ffffff"
          data-original="#000000"
        />
      </g>
    </g>
  </svg>
);

const PersonBlack = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <g>
        <circle
          cx="256"
          cy="128"
          r="128"
          fill="#000000"
          data-original="#000000"
        />
        <path
          d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z"
          fill="#000000"
          data-original="#000000"
        />
      </g>
    </g>
  </svg>
);

const Search = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 513.749 513.749"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <g>
        <path
          d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"
          fill="#ffffff"
          data-original="#000000"
        />
      </g>
    </g>
  </svg>
);

const ShoppingBag = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <path
        d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A3,3,0,0,0,21,6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1Z"
        fill="#ff9393"
        data-original="#000000"
      />
    </g>
  </svg>
);

const ShoppingCart = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    className="hwfull"
  >
    <g>
      <path
        d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077Z"
        fill="#ffffff"
        data-original="#000000"
      />
      <circle cx="7" cy="22" r="2" fill="#ffffff" data-original="#000000" />
      <circle cx="17" cy="22" r="2" fill="#ffffff" data-original="#000000" />
    </g>
  </svg>
);

const SquareFour = () => (
  <svg
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 512 512"
    className="hwfull"
    xmlSpace="preserve"
  >
    <g>
      <path
        d="M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z"
        fill="#609ae9"
        data-original="#000000"
      />
      <path
        d="M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z"
        fill="#609ae9"
        data-original="#000000"
      />
      <path
        d="M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z"
        fill="#609ae9"
        data-original="#000000"
      />
      <path
        d="M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z"
        fill="#609ae9"
        data-original="#000000"
      />
    </g>
  </svg>
);

const Settings = () => (
  <svg viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z" />
  </svg>
);

const CheckList = () => (
  <svg width="512" height="512" viewBox="0 0 24 24">
    <path d="m4 6a2.982 2.982 0 0 1 -2.122-.879l-1.544-1.374a1 1 0 0 1 1.332-1.494l1.585 1.414a1 1 0 0 0 1.456.04l3.604-3.431a1 1 0 0 1 1.378 1.448l-3.589 3.414a2.964 2.964 0 0 1 -2.1.862zm20-2a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.589-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1.023 1.023 0 0 1 -1.414 0l-1.59-1.585a1 1 0 0 0 -1.414 1.414l1.585 1.585a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.585-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1 1 0 0 1 -1.456-.04l-1.585-1.414a1 1 0 0 0 -1.332 1.494l1.544 1.374a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1z" />
  </svg>
);

const Monitor = () => (
  <svg viewBox="0 0 24 24" width="512" height="512">
    <path d="M19,1H5A5.006,5.006,0,0,0,0,6v8a5.006,5.006,0,0,0,5,5h6v2H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2H13V19h6a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,3,3v7H2V6A3,3,0,0,1,5,3ZM19,17H5a3,3,0,0,1-2.816-2H21.816A3,3,0,0,1,19,17Z" />
  </svg>
);
const Document = () => (
  <svg
    version="1.1"
    className="hwfull"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
  >
    <g>
      <path
        d="m19.535 3.122-1.656-1.658a4.968 4.968 0 0 0 -3.536-1.464h-6.343a5.006 5.006 0 0 0 -5 5v14a5.006 5.006 0 0 0 5 5h8a5.006 5.006 0 0 0 5-5v-12.343a4.968 4.968 0 0 0 -1.465-3.535zm-1.414 1.414a2.932 2.932 0 0 1 .379.464h-2.5v-2.5a3.1 3.1 0 0 1 .465.38zm.879 14.464a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3-3v-14a3 3 0 0 1 3-3h6v3a2 2 0 0 0 2 2h3zm-3-10a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2zm1 5a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm-.192 3.413a1 1 0 0 1 -.217 1.394 6.464 6.464 0 0 1 -3.456 1.193 3.252 3.252 0 0 1 -2-.7c-.328-.225-.453-.3-.7-.3a3.951 3.951 0 0 0 -1.832.794 1 1 0 0 1 -1.214-1.588 5.861 5.861 0 0 1 3.05-1.206 3.025 3.025 0 0 1 1.832.655 1.347 1.347 0 0 0 .864.345 4.586 4.586 0 0 0 2.277-.809 1 1 0 0 1 1.396.222z"
        fill="#000000"
        data-original="#000000"
      />
    </g>
  </svg>
);

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
    <path d="M12,16a2.993,2.993,0,0,1-1.987-.752c-.327-.291-.637-.574-.84-.777L6.3,11.647a1,1,0,0,1,1.4-1.426L10.58,13.05c.188.187.468.441.759.7a1,1,0,0,0,1.323,0c.29-.258.57-.512.752-.693L16.3,10.221a1,1,0,1,1,1.4,1.426l-2.879,2.829c-.2.2-.507.48-.833.769A2.99,2.99,0,0,1,12,16Z" />
  </svg>
);

const Menu = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
    <rect y="11" width="24" height="2" rx="1" />
    <rect y="4" width="24" height="2" rx="1" />
    <rect y="18" width="24" height="2" rx="1" />
  </svg>
);
