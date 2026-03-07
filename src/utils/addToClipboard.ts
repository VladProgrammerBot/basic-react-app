export async function addTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available or on an insecure context.");
    alert(
      "Clipboard API not supported. Please use a modern browser over HTTPS.",
    );
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Could not copy text. Check the browser console for details.");
  }
}
