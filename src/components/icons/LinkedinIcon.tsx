type Props = {
  width?: string;
  height?: string;
};

const LinkedinIcon = ({ width = '50', height = '50' }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        viewBox='0 0 256 256'
        xmlSpace='preserve'
      >
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1,
          }}
        >
          <path
            d='M0 6.447C0 2.887 2.978 0 6.651 0h76.698C87.022 0 90 2.887 90 6.447v77.106C90 87.114 87.022 90 83.349 90H6.651C2.978 90 0 87.114 0 83.553z'
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#069',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform='translate(1.407 1.407)scale(2.81)'
          />
          <path
            d='M20.485 29.151c4.74 0 7.691-3.121 7.691-7.021-.088-3.988-2.95-7.022-7.601-7.022s-7.69 3.034-7.69 7.022c0 3.9 2.95 7.021 7.512 7.021zm6.797 46.188v-40.64H13.688v40.64zm7.522 0h13.594V52.644c0-1.215.088-2.428.447-3.296.983-2.427 3.219-4.94 6.975-4.94 4.919 0 6.887 3.727 6.887 9.19v21.741h13.592V52.037c0-12.483-6.706-18.291-15.65-18.291-7.333 0-10.553 4.073-12.342 6.847h.091v-5.894H34.804c.178 3.814 0 40.64 0 40.64'
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#fff',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform='translate(1.407 1.407)scale(2.81)'
          />
        </g>
      </svg>
    </>
  );
};

export default LinkedinIcon;
