const GlowingCard = () => {
    return (
        <svg
            width="678"
            height="551"
            viewBox="0 0 678 551"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_104_32)">
                <rect
                    x="256"
                    y="194"
                    width="165"
                    height="164"
                    rx="10"
                    fill="url(#paint0_linear_104_32)"
                />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M360.641 248L341 278.872L338.282 265.333H311L360.641 248ZM315.103 304L334.744 273.128L337.461 286.667H364.744L315.103 304Z"
                fill="#1E1E1E"
            />
            <defs>
                <filter
                    id="filter0_d_104_32"
                    x="115"
                    y="57"
                    width="447"
                    height="446"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="70.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.776471 0 0 0 0 0.988235 0 0 0 0 0.65098 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_104_32"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_104_32"
                        result="shape"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_104_32"
                    x1="338.5"
                    y1="194"
                    x2="338.5"
                    y2="358"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#C6FCA6" />
                    <stop offset="1" stopColor="#A7FCEE" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default GlowingCard;
