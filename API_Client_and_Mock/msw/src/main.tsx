async function prepare() {
  const useMocks =
    import.meta.env.MODE === "development" &&
    import.meta.env.VITE_USE_MOCKS === "true";

  if (useMocks) {
    const { worker } = await import("./mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

prepare().then(() => {
  import("./bootstrap");
});