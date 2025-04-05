interface CurveSeparatorProps {
  bgColor?: string;
  topCurve?: boolean;
}

export function CurveSeparator({ bgColor = "white", topCurve = false }: CurveSeparatorProps) {
  return (
    <div className="curve-separator h-[150px] overflow-hidden" style={{ backgroundColor: topCurve ? "" : bgColor }}>
      <div 
        className={`h-full ${topCurve ? "rounded-t-[50%_50%_0_0] rounded-b-[0]" : "rounded-b-[50%_50%_/_30%]"}`}
        style={{ backgroundColor: topCurve ? bgColor : "" }}
      ></div>
    </div>
  );
}
