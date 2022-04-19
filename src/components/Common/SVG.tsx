import React from "react";

type Name =
  | "bell"
  | "cap"
  | "search"
  | "shopping-bag"
  | "shopping-cart"
  | "person";

const SVG: React.FC<{ name: Name } & React.HTMLAttributes<HTMLDivElement>> = ({
  name,
  ...rest
}) => {
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
