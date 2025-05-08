/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",     // ✅ pastikan ini ada
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",  // opsional kalau simpan story di components
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: { docs: true }
    },
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
};

export default config;
