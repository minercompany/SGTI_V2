package py.com.cooperativa.reducto.sgti.service;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import py.com.cooperativa.reducto.sgti.dto.DashboardStatsDto;
import py.com.cooperativa.reducto.sgti.dto.TicketResponseDto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public byte[] generateExcelReport(List<TicketResponseDto> tickets, DashboardStatsDto stats) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte de Tickets");

            // Styles
            CellStyle headerStyle = workbook.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Headers
            org.apache.poi.ss.usermodel.Row headerRow = sheet.createRow(0);
            String[] columns = { "ID", "Asunto", "Estado", "Prioridad", "Solicitante", "Departamento",
                    "Fecha Creación" };
            for (int i = 0; i < columns.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data
            int rowIdx = 1;
            for (TicketResponseDto ticket : tickets) {
                org.apache.poi.ss.usermodel.Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(ticket.getNumero());
                row.createCell(1).setCellValue(ticket.getAsunto());
                row.createCell(2).setCellValue(ticket.getEstado().getNombre());
                row.createCell(3).setCellValue(ticket.getPrioridad().getNombre());
                row.createCell(4).setCellValue(ticket.getSolicitante().getNombreCompleto());
                row.createCell(5)
                        .setCellValue(ticket.getDepartamento() != null ? ticket.getDepartamento().getNombre() : "N/A");
                row.createCell(6).setCellValue(ticket.getFechaCreacion().format(dateFormatter));
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }

    public byte[] generatePdfReport(List<TicketResponseDto> tickets, DashboardStatsDto stats) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            Document document = new Document(PageSize.A4.rotate());
            PdfWriter.getInstance(document, out);

            document.open();

            // Title
            com.lowagie.text.Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Reporte de Tickets - SGTI Enterprise", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // Summary Stats
            com.lowagie.text.Font statsFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            document.add(new Paragraph("Resumen Ejecutivo:", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14)));
            document.add(new Paragraph("Total Tickets: " + stats.getTotalTickets(), statsFont));
            document.add(new Paragraph("Tickets Abiertos: " + stats.getTicketsAbiertos(), statsFont));
            document.add(Chunk.NEWLINE);

            // Table
            PdfPTable table = new PdfPTable(7);
            table.setWidthPercentage(100);
            table.setWidths(new float[] { 3, 5, 2, 2, 4, 3, 3 });

            // Table Headers
            String[] headers = { "ID", "Asunto", "Estado", "Prioridad", "Solicitante", "Depto", "Fecha" };
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setBackgroundColor(java.awt.Color.LIGHT_GRAY);
                table.addCell(cell);
            }

            // Table Data
            for (TicketResponseDto ticket : tickets) {
                table.addCell(ticket.getNumero());
                table.addCell(ticket.getAsunto());
                table.addCell(ticket.getEstado().getNombre());
                table.addCell(ticket.getPrioridad().getNombre());
                table.addCell(ticket.getSolicitante().getNombreCompleto());
                table.addCell(ticket.getDepartamento() != null ? ticket.getDepartamento().getNombre() : "N/A");
                table.addCell(ticket.getFechaCreacion().format(dateFormatter));
            }

            document.add(table);
            document.close();

            return out.toByteArray();
        } catch (DocumentException e) {
            log.error("Error generating PDF", e);
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
