import { name as agentName } from "@pidev/agent";
import { name as aiName } from "@pidev/ai";
import { name as cliName } from "packages/cli/src";
import { name as codingAgentName } from "@pidev/coding-agent";

console.log("Workspaces imported successfully:");
console.log("- agent:", agentName);
console.log("- ai:", aiName);
console.log("- cli:", cliName);
console.log("- coding-agent:", codingAgentName);