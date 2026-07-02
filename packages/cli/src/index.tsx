/** @jsxImportSource @opentui/react */
import { createCliRenderer } from "@opentui/core"
import { createRoot, useKeyboard, useRenderer } from "@opentui/react"
import { useEffect, useState } from "react"
import os from "node:os"

export const name = "cli";

function WelcomePage() {
  const renderer = useRenderer()
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // Keep time updated
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Listen to exit keys
  useKeyboard((key) => {
    if (key.name === "q" || key.name === "escape") {
      renderer.destroy()
    }
  })

  return (
    <box
      style={{
        border: true,
        borderStyle: "rounded",
        borderColor: "#00FFFF",
        padding: 1,
        flexDirection: "column",
        gap: 1,
        width: 60,
      }}
    >
      {/* Banner */}
      <box style={{ alignItems: "center", justifyContent: "center" }}>
        <text fg="#00FFFF">
          <b>⚡ PIDEV MONOREPO DASHBOARD ⚡</b>
        </text>
      </box>

      {/* Welcome Message */}
      <text>Welcome to your OpenTUI-powered React CLI developer dashboard!</text>

      {/* Workspace Stats */}
      <box title="Workspace Information" style={{ border: true, borderStyle: "single", padding: 1, flexDirection: "column" }}>
        <text fg="#FFD700">Packages:</text>
        <text fg="#98FB98">  • @pidev/agent</text>
        <text fg="#98FB98">  • @pidev/ai</text>
        <text fg="#98FB98">  • @pidev/cli (Active)</text>
        <text fg="#98FB98">  • @pidev/coding-agent</text>
      </box>

      {/* System Details */}
      <box title="System Details" style={{ border: true, borderStyle: "single", padding: 1, flexDirection: "column" }}>
        <text>{`OS Platform : ${os.platform()} (${os.arch()})`}</text>
        <text>{`CPU Cores   : ${os.cpus().length} cores`}</text>
        <text>{`Runtime     : Bun v${Bun.version}`}</text>
        <text>{`Local Time  : ${time}`}</text>
      </box>

      {/* Footer / Info */}
      <box style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <text fg="#FF6347">Press 'Q' or 'ESC' to exit</text>
        <text fg="#888888">v0.1.0</text>
      </box>
    </box>
  )
}

export async function run() {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
  })
  createRoot(renderer).render(<WelcomePage />)
}

if (import.meta.main) {
  run().catch(console.error)
}