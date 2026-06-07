export async function extractTextFromPDF(buffer: Buffer) {
    
    // import pdf parser dynamically to avoid bundling issues
    const {PDFParse} = await import("pdf-parse");

    const parser = new PDFParse({data: buffer});

    const result = await parser.getText();
    await parser.destroy();
    return result.text;
}