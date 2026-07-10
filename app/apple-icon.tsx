import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "0.06em",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          M
        </span>
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            background:
              "linear-gradient(120deg, #f97316 0%, #fbbf24 45%, #fb923c 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size },
  );
}
