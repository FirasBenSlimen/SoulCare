// csv.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  readCsvFile(file: File): Observable<any[]> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result as string;
        const csvData = this.parseCsvData(csvText);
        observer.next(csvData);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsText(file);
    });
  }
  private cleanRow(row: string): string[] {
    // Remove extra whitespaces and trim
    return row.replace(/\r/g, '').split(';').map(value => value.trim());
  }
  private parseCsvData(csvText: string): any[] {
    const rows = csvText.split('\n');
    const headers = this.cleanRow(rows[0]);
    console.log(headers)
    return rows.slice(1).map(row => {
      const values = this.cleanRow(row);
      const rowData: any = {};

      headers.forEach((header, index) => {

        rowData[header] =Number(values[index])>=0 ? Number(values[index]): values[index];
      });
      return rowData;
    });
  }
 
}
