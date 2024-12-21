import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  textFiles: string[] = [];
  imageFiles: string[] = [];
  allFiles: string[] = [];
  selectedFileContent: string = '';

  constructor(private fileService: FileService) { }

  async ngOnInit() {
    await this.loadFiles();
  }

  async loadFiles() {
    try {
      this.textFiles = await this.fileService.readDirectory('text-files', Directory.Data);
      this.imageFiles = await this.fileService.readDirectory('image-files', Directory.Data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }

  async readTextFile(fileName: string) {
    try {
      this.selectedFileContent = await this.fileService.readFile(`text-files/${fileName}`, Directory.Data);
    } catch (error) {
      console.error('Error reading text file:', error);
      this.selectedFileContent = 'Failed to load file content.';
    }
  }

  async openImageFile(fileName: string) {
    try {
      const imageUrl = await this.fileService.getFileUrl(`image-files/${fileName}`, Directory.Data);
      console.log('Image URL:', imageUrl);
      // Здесь можно добавить логику для отображения изображения
    } catch (error) {
      console.error('Error opening image file:', error);
    }
  }

  async deleteFile(fileName: string, directory: string) {
    try {
      await this.fileService.deleteFile(`${directory}/${fileName}`, Directory.Data);
      await this.loadFiles(); // Обновление списка файлов
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async uploadFiles() {
    try {
      // Логика для загрузки файлов на устройство
      console.log('Uploading files...');
      // Пример: можно использовать File Picker или другие библиотеки для загрузки файлов
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  async downloadFiles() {
    try {
      // Логика для выгрузки файлов с устройства
      console.log('Downloading files...');
      // Пример: можно использовать File Saver или другие библиотеки для выгрузки файлов
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  }

  async readDefDir() {
    this.allFiles = await this.fileService.readDirectory("/home/student");
  }

  getImageUrl(fileName: string): string {
    return `/data/data/com.example.app/files/image-files/${fileName}`;
  }
}