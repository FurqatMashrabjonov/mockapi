import { SVGAttributes } from 'react';

export default function Json(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 128 128">
            <linearGradient id="a" x1="-670.564" x2="-583.105" y1="-280.831" y2="-368.306"
                            gradientTransform="matrix(.9988 0 0 -.9987 689.011 -259.008)"
                            gradientUnits="userSpaceOnUse">
                <stop offset="0"></stop>
                <stop offset="1" stopColor="#fff"></stop>
            </linearGradient>
            <path fill="url(#a)" fill-rule="evenodd"
                  d="M63.895 94.303c27.433 37.398 54.281-10.438 54.241-39.205-.046-34.012-34.518-53.021-54.263-53.021C32.182 2.077 2 28.269 2 64.105 2 103.937 36.596 126 63.873 126c-6.172-.889-26.742-5.296-27.019-52.674-.186-32.044 10.453-44.846 26.974-39.214.37.137 18.223 7.18 18.223 30.187 0 22.908-18.156 30.004-18.156 30.004z"
                  clip-rule="evenodd"></path>
            <linearGradient id="b" x1="-579.148" x2="-666.607" y1="-364.34" y2="-276.873"
                            gradientTransform="matrix(.9988 0 0 -.9987 689.011 -259.008)"
                            gradientUnits="userSpaceOnUse">
                <stop offset="0"></stop>
                <stop offset="1" stopColor="#fff"></stop>
            </linearGradient>
            <path fill="url(#b)" fillRule="evenodd"
                  d="M63.863 34.086C45.736 27.838 23.53 42.778 23.53 72.703 23.53 121.565 59.739 126 64.128 126 95.818 126 126 99.808 126 63.972 126 24.14 91.404 2.077 64.127 2.077c7.555-1.046 40.719 8.176 40.719 53.504 0 29.559-24.764 45.651-40.87 38.776-.37-.137-18.223-7.18-18.223-30.187 0-22.91 18.11-30.085 18.11-30.084z"
                  clipRule="evenodd"></path>
        </svg>
    );
}
