import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StorageService} from "../../../../../core/services/storage.service";
import {GroupHealthInsuranceService} from "../../../../../core/services/group-health-insurance.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AddHealthInsuranceComponent} from "../add-health-insurance.component";
import {GroupHealthInsurance} from "../../../../../public/models/group-health-insurance.model";
import {PersonHealthInsuranceService} from "../../../../../core/services/person-health-insurance.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../../../core/services/data.service";
import {PersonHealthInsurance} from "../../../../../public/models/person-health-insurance.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Card} from "../../../../../public/shared/card";
import data from "../../../../../public/data";
import {DatesHelper} from "../../../../../public/helpers/DatesHelper";
import {MyForm} from "../../../../../public/shared/my-form";
import {TaxesHelper} from "../../../../../public/helpers/TaxesHelper";
import moment from "moment/moment";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {MatSelectChange} from "@angular/material/select";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-group-health-insurance',
  templateUrl: './add-group-health-insurance.component.html',
  styleUrls: ['./add-group-health-insurance.component.scss']
})
export class AddGroupHealthInsuranceComponent {

  @Output() insuranceEvent = new EventEmitter<string>();
  @Input() type!: string

  constructor(private groupHealthInsuranceService: GroupHealthInsuranceService, private dialog: MatDialog, private tokenStorageService: StorageService, private router: Router, private dataService: DataService) {
  }

  actualUser = this.tokenStorageService.getUser()
  groupHealthInsurance = new GroupHealthInsurance()

  ngOnInit() {
    this.dataService.fetchCountries()
  }

  formGroup = new FormGroup({
    type: new FormControl('صحي مجموعات', Validators.required),
    period: new FormControl('', Validators.required),
    startDate: new FormControl({value: '', disabled: true}, Validators.required),
    endDate: new FormControl({value: '', disabled: true}, Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}$')]),
    address: new FormControl('', Validators.required),
    methode_paiement: new FormControl('', Validators.required),
    capital_societe: new FormControl('', [Validators.required, Validators.min(0)]),
    tranche: new FormControl('', [Validators.required, Validators.min(0)]),
    initial: new FormControl('', [Validators.required, Validators.min(0)]),
    taxe1: new FormControl('', [Validators.required, Validators.min(0)]),
    taxe2: new FormControl('', [Validators.required, Validators.min(0)]),
    taxe4: new FormControl('', [Validators.required, Validators.min(0)]),
    total: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(0)]),
  })


  cards: Card[] = [
    {
      title: "معلومات عن التأمين",
      fields: [
        {
          hasAction: 'yes',
          action: this.changeType.bind(this),
          form: {
            type: "select",
            label: "نوعية التأمين",
            hidden: false,
            formControlName: "type",
            isObject: false,
            selectOptions: data.health_insurance.types
          }
        },
        {
          hasAction: 'yes',
          action: this.selectInsuranceType.bind(this),
          form: {
            type: "select",
            label: "فترة التأمين",
            hidden: false,
            formControlName: "period",
            isObject: true,
            selectOptions: data.health_insurance.insurancePeriods,
          }
        },
        {
          hasAction: 'yes',
          action: this.changeEndDate.bind(this),
          form: {
            type: 'date',
            label: 'تاريخ البداية',
            hidden: false,
            minDate: new Date(),
            maxDate: DatesHelper.getDatePlusYears(50),
            formControlName: 'startDate',
          }
        },
        {
          hasAction: 'no',
          form: {
            type: 'date',
            label: 'تاريخ النهاية',
            hidden: false,
            minDate: new Date(),
            maxDate: DatesHelper.getDatePlusYears(50),
            formControlName: 'endDate',
          }
        }
      ]
    },
    {
      title: "معلومات عن الجهة",
      fields: [
        {
          hasAction: 'no',
          form: {
            type: "text",
            label: "إسم الجهة",
            hidden: false,
            formControlName: "name",
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "tel",
            label: "رقم الهاتف",
            hidden: false,
            errorsMessages: {
              pattern: 'يجب أن يتكون رقم الهاتف من 10 أرقام',
            },
            formControlName: "phone",
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "text",
            label: "العنوان",
            hidden: false,
            formControlName: "address",
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "select",
            label: "طريقة الدفع",
            hidden: false,
            formControlName: "methode_paiement",
            isObject: false,
            selectOptions: data.global.paymentMethods,
          }
        },
        {
          hasAction: 'yes',
          action: this.calculateTaxes.bind(this),
          form: {
            type: "number",
            label: "قيمة التأمين",
            hidden: false,
            formControlName: "capital_societe",
            errorsMessages: {
              min: 'يجب أن تكون قيمة التأمين أكبر من 0',
            }
          }
        },
      ]
    },
    {
      title: "حساب الضرائب",
      fields: [
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "قيمة القسط",
            hidden: false,
            formControlName: "tranche",
            errorsMessages: {
              min: 'يجب أن تكون قيمة القسط أكبر من 0',
            }
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "القسط الصافي",
            hidden: false,
            formControlName: "initial",
            errorsMessages: {
              min: 'يجب أن يكون القسط الصافي أكبر من 0',
            }
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "الضريبة",
            hidden: false,
            formControlName: "taxe1",
            errorsMessages: {
              min: 'يجب أن تكون الضريبة أكبر من 0',
            }
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "الدمغة",
            hidden: false,
            formControlName: "taxe2",
            errorsMessages: {
              min: 'يجب أن تكون الدمغة أكبر من 0',
            }
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "م الإصدار",
            hidden: false,
            formControlName: "taxe4",
            errorsMessages: {
              min: 'يجب أن يكون م الإصدار أكبر من 0',
            }
          }
        },
        {
          hasAction: 'no',
          form: {
            type: "number",
            label: "الإجمالي",
            hidden: false,
            formControlName: "total",
            errorsMessages: {
              min: 'يجب أن يكون م الإصدار أكبر من 0',
            }
          }
        },
      ]
    }
  ]

  myForm: MyForm = {
    title: "إضافة مسؤلية صحية",
    formGroup: this.formGroup,
    cards: this.cards,
  }

  calculateTaxes() {
    let capital = this.myForm.formGroup.get('capital_societe')
    if (capital?.value !== '' && !capital?.hasError('required')) {
      let taxes = TaxesHelper.calculateGroupHealthInsuranceTax(capital?.value)
      this.myForm.formGroup.get('tranche')?.setValue(taxes.tranche)
      this.myForm.formGroup.get('initial')?.setValue(taxes.initial)
      this.myForm.formGroup.get('taxe1')?.setValue(taxes.taxe1)
      this.myForm.formGroup.get('taxe2')?.setValue(taxes.taxe2)
      this.myForm.formGroup.get('taxe4')?.setValue(taxes.taxe4)
      this.myForm.formGroup.get('total')?.setValue(taxes.total)
    }
  }

  selectInsuranceType() {
    if (this.myForm.formGroup.get('period')?.hasError('required')) {
      this.myForm.formGroup.get('startDate')?.disable()
    } else {
      this.myForm.formGroup.get('startDate')?.setValue(moment())
      this.myForm.formGroup.get('startDate')?.enable()
      let id: number = this.myForm.formGroup.get('period')?.value
      let endDate = DatesHelper.getEndDateFromData(id, data.health_insurance.insurancePeriods, this.myForm.formGroup.get('startDate')?.value)
      this.myForm.formGroup.get('endDate')?.setValue(endDate)
    }
  }

  changeEndDate() {
    let id: number = this.myForm.formGroup.get('period')?.value
    let endDate = DatesHelper.getEndDateFromData(id, data.health_insurance.insurancePeriods, this.myForm.formGroup.get('startDate')?.value)
    this.myForm.formGroup.get('endDate')?.setValue(endDate)
  }

  addGroupHealthInsurance(dialogRef: MatDialogRef<DialogComponent>) {
    dialogRef._containerInstance._config.data.isLoading = true
    this.groupHealthInsurance.type = "صحي مجموعات"
    let id: number = this.myForm.formGroup.get('period')?.value
    let period = data.health_insurance.insurancePeriods.find((row) => {
      return row.id === id
    })?.name
    this.groupHealthInsurance.period = period as string
    this.groupHealthInsurance.startDate = this.myForm.formGroup.get('startDate')?.value
    this.groupHealthInsurance.endDate = this.myForm.formGroup.get('endDate')?.value
    this.groupHealthInsurance.name = this.myForm.formGroup.get('name')?.value
    this.groupHealthInsurance.address = this.myForm.formGroup.get('address')?.value
    this.groupHealthInsurance.phone = this.myForm.formGroup.get('phone')?.value
    this.groupHealthInsurance.methode_paiement = this.myForm.formGroup.get('methode_paiement')?.value
    this.groupHealthInsurance.capital_societe = this.myForm.formGroup.get('capital_societe')?.value
    this.groupHealthInsurance.tranche = this.myForm.formGroup.get('tranche')?.value
    this.groupHealthInsurance.initial = this.myForm.formGroup.get('initial')?.value
    this.groupHealthInsurance.taxe1 = this.myForm.formGroup.get('taxe1')?.value
    this.groupHealthInsurance.taxe2 = this.myForm.formGroup.get('taxe2')?.value
    this.groupHealthInsurance.taxe4 = this.myForm.formGroup.get('taxe4')?.value
    this.groupHealthInsurance.total = this.myForm.formGroup.get('total')?.value
    this.groupHealthInsurance.userId = this.tokenStorageService.getUser().id
    this.groupHealthInsuranceService.createGroupHealthInsurance(this.groupHealthInsurance).subscribe({
        next: () => {
          dialogRef._containerInstance._config.data.isLoading = false
          dialogRef.close()
          this.router.navigate(['/dashboard/healthInsurances'])
        }, error: (err) => {
          dialogRef._containerInstance._config.data.isLoading = false
          dialogRef.close()
          this.myForm.formGroup.reset()
          console.log(err);
        }
      }
    )
  }

  changeType(e:Event | MatSelectChange | MatDatepickerInputEvent<any, any>) {
    let type = ""
    if (e instanceof MatSelectChange) {
      type = e.value
    }
    this.type=type
    this.insuranceEvent.emit(type);
  }


  onSubmit() {
    if (!this.myForm.formGroup.pristine && this.myForm.formGroup.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "تأمين صحي للمجموعات",
          content: "هل تريد إضافة هذا التأمين الصحي الخاص بالمجموعات ؟",
          isLoading: false,
          onSubmit: () => this.addGroupHealthInsurance(dialogRef)

        }, autoFocus: false, panelClass: 'choice-dialog-container'
      });
    }
  }

}
