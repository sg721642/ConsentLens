export default function exportPDF(
  results
) {
  const content =
    JSON.stringify(
      results,
      null,
      2
    );

  const blob =
    new Blob(
      [content],
      {
        type: "text/plain",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;

  a.download =
    "ConsentLens_Report.txt";

  a.click();

  URL.revokeObjectURL(
    url
  );
}