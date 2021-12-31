import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatexPipe } from "../datex.pipe";
import * as moment from "moment";
import { AuthService } from "../auth.service";
import { DeliveryService } from "../delivery.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.component.html",
  styleUrls: ["./orderdetails.component.css"],
})
export class OrderdetailsComponent implements OnInit {
  orderId: string = "";
  orderDetails: any = {};
  totalPrice = 0;
  CurrentBody: any = [
    // Table Header
    [
      {
        text: "Produit",
        style: "itemsHeader",
      },
      {
        text: "Commentaire",
        style: "itemsHeader",
      },
      {
        text: "Qte",
        style: ["itemsHeader", "center"],
      },
      {
        text: "Prix",
        style: ["itemsHeader", "center"],
      },
      {
        text: "Total",
        style: ["itemsHeader", "center"],
      },
    ],
    // Items
    // Item 1

    // END Items
  ];
  BASE_URL = environment.BASE_URL;
  dd: any = {};
  orderNumber: any;
  deliverPrice = 0;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public authServ: AuthService,
    private deliver: DeliveryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.orderId = params.id;
      this.orderNumber = params.number;
      this.initFunction();
    });
  }
  generatePdf() {
    const documentDefinition = this.dd;
    pdfMake.createPdf(documentDefinition).open();
  }
  initFunction() {
    this.deliver.getDeliveryPrice().subscribe((data) => {
      let result: any = data;
      this.deliverPrice = result.price;
    });
    console.log("Deliver Price", this.deliverPrice);
    this.orderService.getOrderForClientById(this.orderId).subscribe((data) => {
      let result: any = data;
      this.orderDetails = result;
      this.orderDetails.items.forEach((element) => {
        let Itm = [
          [
            {
              text: element.item.productName,
              style: "itemTitle",
            },
          ],
          {
            text: element.item.comment,
            style: "itemTitle",
          },
          {
            text: element.quantity,
            style: "itemNumber",
          },
          {
            text: element.price.toFixed(3),
            style: "itemNumber",
          },
          {
            text: (element.price * element.quantity).toFixed(3),
            style: "itemNumber",
          },
        ];

        this.totalPrice = this.totalPrice + element.price * element.quantity;
        console.log(this.totalPrice);
        this.CurrentBody.push(Itm);
      });
      let totalBody = [
        // Total
        [
          {
            text: "TOTAL",
            style: "itemsFooterSubTitle",
          },
          {
            text: this.totalPrice.toFixed(3) + " DT",
            style: "itemsFooterSubValue",
          },
        ],
        [
          {
            text: "LIVRAISON",
            style: "itemsFooterSubTitle",
          },
          {
            text: this.deliverPrice.toFixed(3) + " DT",
            style: "itemsFooterSubValue",
          },
        ],
        [
          {
            text: "A PAYER ",
            style: "itemsFooterTotalTitle",
          },
          {
            text: (this.totalPrice + this.deliverPrice).toFixed(3) + " DT",
            style: "itemsFooterTotalValue",
          },
        ],
      ];
      this.initBody(
        totalBody,
        this.CurrentBody,
        this.orderDetails.owner.fullname,
        this.orderDetails.owner.phoneNumber,
        this.orderDetails.address,
        this.orderDetails.orderDate
      );
    });
  }

  initBody(
    totalBody,
    productBody,
    clientName,
    clientPhone,
    DeliveryAdress,
    Date
  ) {
    this.dd = {
      header: {
        columns: [
          //  { text: 'HEADER LEFT', style: 'documentHeaderLeft' },
          //  { text: 'HEADER CENTER', style: 'documentHeaderCenter' },
          //  { text: 'HEADER RIGHT', style: 'documentHeaderRight' }
        ],
      },
      //  footer: {
      //    columns: [
      //      { text: 'FOOTER LEFT', style: 'documentFooterLeft' },
      //      { text: 'FOOTER CENTER', style: 'documentFooterCenter' },
      //      { text: 'FOOTER RIGHT', style: 'documentFooterRight' }
      //    ]
      //  },
      content: [
        // Header
        {
          columns: [
            {
              image:
                "data:image/png;base64,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",
              width: 150,
            },

            [
              {
                text: "Commande Client",
                style: "invoiceTitle",
                width: "*",
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: "Numero #",
                        style: "invoiceSubTitle",
                        width: "*",
                      },
                      {
                        text: this.orderNumber,
                        style: "invoiceSubValue",
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      // {
                      //     text:'Date Issued',
                      //     style:'invoiceSubTitle',
                      //     width: '*'
                      // },
                      // {
                      //   text: "June 01, 2016",
                      //   style: "invoiceSubValue",
                      //   width: 100,
                      // },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: "Date de commande",
                        style: "invoiceSubTitle",
                        width: "*",
                      },
                      {
                        text: this.transform(Date, "DD/MM/YYYY"),
                        style: "invoiceSubValue",
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        // Billing Headers
        {
          columns: [
            {
              text: "Client",
              style: "invoiceBillingTitle",
            },
            {
              text: "Adresse",
              style: "invoiceBillingTitle",
            },
          ],
        },
        // Billing Details
        {
          columns: [
            {
              text: clientName,
              style: "invoiceBillingDetails",
            },
            {
              text: DeliveryAdress,
              style: "invoiceBillingDetails",
            },
          ],
        },
        // Billing Address Title
        {
          columns: [
            {
              text: "Telephone",
              style: "invoiceBillingAddressTitle",
            },
            // {
            //   text: DeliveryAdress,
            //   style: "invoiceBillingAddressTitle",
            // },
          ],
        },
        // Billing Address
        {
          columns: [
            {
              text: clientPhone,
              style: "invoiceBillingAddress",
            },
          ],
        },
        // Line breaks
        "\n\n",
        // Items
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["auto", "*", 40, "auto", 80],

            body: productBody,
          }, // table
          //  layout: 'lightHorizontalLines'
        },
        // TOTAL
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: ["*", 80],

            body: totalBody,
          }, // table
          layout: "lightHorizontalLines",
        },
        // Signature
        {
          columns: [
            {
              text: "",
            },
            {
              stack: [
                {
                  text: "_________________________________",
                  style: "signaturePlaceholder",
                },
                {
                  text: "Cuba Market",
                  style: "signatureName",
                },
              ],
              width: 180,
            },
          ],
        },
      ],
      styles: {
        // Document Header
        documentHeaderLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "left",
        },
        documentHeaderCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "center",
        },
        documentHeaderRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "right",
        },
        // Document Footer
        documentFooterLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "left",
        },
        documentFooterCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "center",
        },
        documentFooterRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: "right",
        },
        // Invoice Title
        invoiceTitle: {
          fontSize: 22,
          bold: true,
          alignment: "right",
          margin: [0, 0, 0, 15],
        },
        // Invoice Details
        invoiceSubTitle: {
          fontSize: 12,
          alignment: "right",
        },
        invoiceSubValue: {
          fontSize: 12,
          alignment: "right",
        },
        // Billing Headers
        invoiceBillingTitle: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [0, 20, 0, 5],
        },
        // Billing Details
        invoiceBillingDetails: {
          alignment: "left",
        },
        invoiceBillingAddressTitle: {
          margin: [0, 7, 0, 3],
          bold: true,
        },
        invoiceBillingAddress: {},
        // Items Header
        itemsHeader: {
          margin: [0, 5, 0, 5],
          bold: true,
        },
        // Item Title
        itemTitle: {
          bold: true,
        },
        itemSubTitle: {
          italics: true,
          fontSize: 11,
        },
        itemNumber: {
          margin: [0, 5, 0, 5],
          alignment: "center",
        },
        itemTotal: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },

        // Items Footer (Subtotal, Total, Tax, etc)
        itemsFooterSubTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "right",
        },
        itemsFooterSubValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },
        itemsFooterTotalTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "right",
        },
        itemsFooterTotalValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: "center",
        },
        signaturePlaceholder: {
          margin: [0, 70, 0, 0],
        },
        signatureName: {
          bold: true,
          alignment: "center",
        },
        signatureJobTitle: {
          italics: true,
          fontSize: 10,
          alignment: "center",
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
        center: {
          alignment: "center",
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
  }
  transform(value: any, format: string = ""): string {
    // Try and parse the passed value.
    var momentDate = moment(value);

    // If moment didn't understand the value, return it unformatted.
    if (!momentDate.isValid()) {
      return value;
    }

    // Otherwise, return the date formatted as requested.
    return momentDate.format(format);
  }

  acceptOrder() {
    this.orderService.confirmOrder(this.orderId).subscribe((data) => {
      let result: any = data;
      console.log(result);
      if (result) {
        this.initFunction();
      }
    });
  }
  refuseOrder() {
    this.orderService.cancelOrder(this.orderId).subscribe((data) => {
      let result: any = data;
      console.log(result);
      if (result) {
        this.initFunction();
      }
    });
  }
}
