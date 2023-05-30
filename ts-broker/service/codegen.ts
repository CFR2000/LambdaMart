import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./src/schema/*.ts", "./src/resolvers/*.ts"],
  generates: {
    "./src/types/generated_types.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
