export function getArcPath(
  cx: number,
  cy: number,
  r: number,
  progress: number,
) {
  const endAngle = (progress / 100) * Math.PI * 2 // 结束角度（弧度）
  const x = cx + r * Math.sin(endAngle)
  const y = cy - r * Math.cos(endAngle)

  return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${
    endAngle < Math.PI ? '0' : '1'
  },1 ${x},${y} Z`
}
