import { analyzePhrase } from "./analyzer";

const args = process.argv.slice(2);
const depthIndex = args.indexOf('--depth');

const argsNotOk = depthIndex < 1 || depthIndex + 1 >= args.length
if (argsNotOk) {
  console.error('Usage: bun run cli.ts analyze --depth <n> "{phrase}"');
  process.exit(1);
}

const depth = parseInt(args[depthIndex + 1]);
let phrase = args.slice(depthIndex + 2).join(' ');
const analyzingPhrase = analyzePhrase(phrase, depth);

const hasCategoryForThisPhrase = Object.keys(analyzingPhrase).length
if (!hasCategoryForThisPhrase) {
  console.log(`No words found at depth ${depth}.`);
} else {
  const output = Object.entries(analyzingPhrase)
    .map(([category, count]) => `${category} = ${count}`)
    .join('; ');
  console.log(output);
}
