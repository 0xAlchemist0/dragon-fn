function ChartIcon({ color, width, height }: any) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke={color}
      stroke-width="1.5"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 15.5v1.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218H21m-18-5v-12m0 12 3.857-3.213c1.634-1.362 2.708-1.222 4.119.189l.006.006c1.538 1.538 2.64 1.474 4.172.133L21 7.5" />
    </svg>
  );
}

export default ChartIcon;
