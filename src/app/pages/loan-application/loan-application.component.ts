import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ApiResponseModel, Application, Loan } from '../../model/application.model';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css'] // Corrected from styleUrl to styleUrls
})
export class LoanApplicationComponent {
  application: Application = new Application();
  loan: Loan = new Loan();
  mastersrv = inject(MasterService);

  addLoan() {
    const newLoan = { ...this.loan }; // Clone the loan object
    this.application.Loans.unshift(newLoan);
    this.loan = new Loan(); // Reset loan form
  }

  onSubmit() {
    this.mastersrv.addNewApplication(this.application).subscribe({
      next: (result: ApiResponseModel) => {
        if (result.result) {
          alert("Loan Application Success");
        } else {
          alert(result.message);
        }
      },
      error: (err) => {
        alert("An error occurred: " + err);
      }
    });
  }
}
