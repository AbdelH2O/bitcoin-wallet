import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			"process.env.NEXT_PUBLIC_DOMAIN": JSON.stringify(
				env.NEXT_PUBLIC_DOMAIN,
			),
			global: {},
		},
		plugins: [react()],
	};
});
