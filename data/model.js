(function (global, $data, undefined) {

    $data.Entity.extend('model.Users', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'IdPerson': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Username': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Password': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsAgent': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsBlocked': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Users_Settings', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdUser': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdSetting': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Setting': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Value': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'DataType': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.ContactMethods', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsDefault': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.PaymentMethods', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsDefault': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.ActivitiesTypes', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Cities', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdCountry': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdRegion': { 'type': 'Edm.Guid', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Countries', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'A2Code': { 'type': 'Edm.String', 'nullable': true },
        'A3Code': { 'type': 'Edm.String', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Currencies', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsDefault': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.MeasurementUnits', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Abbreviation': { 'type': 'Edm.String', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.PaymentTerms', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Value': { 'type': 'Edm.Int32', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.ReceiptTypes', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsDefault': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Regions', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdCountry': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Code': { 'type': 'Edm.String', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.VATClasses', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Value': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Stores', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'IdHeadquarter': { 'type': 'Edm.Guid', 'nullable': true },
        'IdStoreType': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'FiscalCode': { 'type': 'Edm.String', 'nullable': true },
        'TradeCommerceRegCode': { 'type': 'Edm.String', 'nullable': true },
        'Country': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Region': { 'type': 'Edm.String', 'nullable': true },
        'City': { 'type': 'Edm.String', 'nullable': true },
        'Address': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'ZipCode': { 'type': 'Edm.String', 'nullable': true },
        'Latitude': { 'type': 'Edm.Double', 'nullable': true },
        'Longitude': { 'type': 'Edm.Double', 'nullable': true },
        'PhoneNumber': { 'type': 'Edm.String', 'nullable': true },
        'FaxNumber': { 'type': 'Edm.String', 'nullable': true },
        'Email': { 'type': 'Edm.String', 'nullable': true },
        'Contact': { 'type': 'Edm.String', 'nullable': true },
        'ContactPhoneNumber': { 'type': 'Edm.String', 'nullable': true },
        'ContactEmail': { 'type': 'Edm.String', 'nullable': true },
        'IdSaleZone': { 'type': 'Edm.Guid', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.CustomerCategories', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsSubCategory': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Customers', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'FiscalCode': { 'type': 'Edm.String', 'nullable': true },
        'TradeCommerceRegCode': { 'type': 'Edm.String', 'nullable': true },
        'IdCountry': { 'type': 'Edm.Guid', 'nullable': true },
        'Country': { 'type': 'Edm.String', 'nullable': true },
        'IdRegion': { 'type': 'Edm.Guid', 'nullable': true },
        'Region': { 'type': 'Edm.String', 'nullable': true },
        'IdCity': { 'type': 'Edm.Guid', 'nullable': true },
        'City': { 'type': 'Edm.String', 'nullable': true },
        'Address': { 'type': 'Edm.String', 'nullable': true },
        'ZipCode': { 'type': 'Edm.String', 'nullable': true },
        'Latitude': { 'type': 'Edm.Double', 'nullable': true },
        'Longitude': { 'type': 'Edm.Double', 'nullable': true },
        'PhoneNumber': { 'type': 'Edm.String', 'nullable': true },
        'FaxNumber': { 'type': 'Edm.String', 'nullable': true },
        'Email': { 'type': 'Edm.String', 'nullable': true },
        'Bank': { 'type': 'Edm.String', 'nullable': true },
        'BankAccount': { 'type': 'Edm.String', 'nullable': true },
        'Contact': { 'type': 'Edm.String', 'nullable': true },
        'ContactPhoneNumber': { 'type': 'Edm.String', 'nullable': true },
        'ContactEmail': { 'type': 'Edm.String', 'nullable': true },
        'DiscountSchemaCode': { 'type': 'Edm.String', 'nullable': true },
        'IdVATClass': { 'type': 'Edm.Guid', 'nullable': true },
        'VATClass': { 'type': 'Edm.String', 'nullable': true },
        'VATValue': { 'type': 'Edm.String', 'nullable': true },
        'IdHeadquarter': { 'type': 'Edm.Guid', 'nullable': true },
        'Headquarter': { 'type': 'Edm.String', 'nullable': true },
        'IdCategory': { 'type': 'Edm.Guid', 'nullable': true },
        'Category': { 'type': 'Edm.String', 'nullable': true },
        'IdSubCategory': { 'type': 'Edm.Guid', 'nullable': true },
        'SubCategory': { 'type': 'Edm.String', 'nullable': true },
        'IdPaymentMethod': { 'type': 'Edm.Guid', 'nullable': true },
        'PaymentMethod': { 'type': 'Edm.String', 'nullable': true },
        'IdPaymentTerm': { 'type': 'Edm.Guid', 'nullable': true },
        'PaymentTerm': { 'type': 'Edm.String', 'nullable': true },
        'PaymentTermValue': { 'type': 'Edm.Int32', 'nullable': true },
        'IdSaleZone': { 'type': 'Edm.Guid', 'nullable': true },
        'IdStore': { 'type': 'Edm.Guid', 'nullable': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': true },
        'TotalBalance': { 'type': 'Edm.Double', 'nullable': true },
        'LocationAcquired': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'LocationAcquiredDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'IsQuarantined': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsBlocked': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.ProductsCategories', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsSubCategory': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Products', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ERP_REF_1': { 'type': 'Edm.String', 'nullable': true },
        'ERP_REF_2': { 'type': 'Edm.String', 'nullable': true },
        'Name': { 'type': 'Edm.String', 'nullable': false },
        'Barcode': { 'type': 'Edm.String', 'nullable': true },
        'Description': { 'type': 'Edm.String', 'nullable': true },
        'IdCategory': { 'type': 'Edm.Guid', 'nullable': true },
        'Category': { 'type': 'Edm.String', 'nullable': true },
        'IdSubCategory': { 'type': 'Edm.Guid', 'nullable': true },
        'SubCategory': { 'type': 'Edm.String', 'nullable': true },
        'IdMeasurementUnit': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'MeasurementUnit': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Height': { 'type': 'Edm.Double', 'nullable': true },
        'Width': { 'type': 'Edm.Double', 'nullable': true },
        'Length': { 'type': 'Edm.Double', 'nullable': true },
        'Volume': { 'type': 'Edm.Double', 'nullable': true },
        'Weight': { 'type': 'Edm.Double', 'nullable': true },
        'IdCurrency': { 'type': 'Edm.Guid', 'nullable': true },
        'ListPrice': { 'type': 'Edm.Double', 'nullable': true },
        'IdVATClass': { 'type': 'Edm.Guid', 'nullable': true },
        'VATClass': { 'type': 'Edm.String', 'nullable': true },
        'VATValue': { 'type': 'Edm.Double', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Stocks', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdStore': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdProduct': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Quantity': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Prices', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdCustomer': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdProduct': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdCurrency': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Price': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'BeginDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'EndDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.DiscountSchemas', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'DiscountSchemaCode': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'ProductCategory': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'DiscountValue': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'Active': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Visits', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdCustomer': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdContactMethod': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Priority': { 'type': 'Edm.Int32', 'nullable': false, 'required': true },
        'Batch': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Number': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Reference': { 'type': 'Edm.String', 'nullable': true },
        'BeginDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ActivationDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'EndDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'ShouldConfirmPhysicalPresence': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'PhysicalPresenceConfirmed': { 'type': 'Edm.Boolean', 'nullable': true },
        'PPCLatitude': { 'type': 'Edm.Double', 'nullable': true },
        'PPCLongitude': { 'type': 'Edm.Double', 'nullable': true },
        'PPCDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'State': { 'type': 'Edm.String', 'nullable': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Activities', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdVisit': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdActivityType': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdCustomer': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Batch': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Number': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Reference': { 'type': 'Edm.String', 'nullable': true },
        'BeginDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'ActivationDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'EndDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'State': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IsActive': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.PurchaseOrders_Headers', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdVisit': { 'type': 'Edm.Guid', 'nullable': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': true },
        'Batch': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Number': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'CustomerOrderNumber': { 'type': 'Edm.String', 'nullable': true },
        'IdCustomer': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'DeliveryDate': { 'type': 'Edm.DateTime', 'nullable': true },
        'BeneficiaryOrderNumber': { 'type': 'Edm.String', 'nullable': true },
        'IdBeneficiary': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Beneficiary': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IdDeliveryCountry': { 'type': 'Edm.Guid', 'nullable': true },
        'DeliveryCountry': { 'type': 'Edm.String', 'nullable': true },
        'IdDeliveryRegion': { 'type': 'Edm.Guid', 'nullable': true },
        'DeliveryRegion': { 'type': 'Edm.String', 'nullable': true },
        'IdDeliveryCity': { 'type': 'Edm.Guid', 'nullable': true },
        'DeliveryCity': { 'type': 'Edm.String', 'nullable': true },
        'DeliveryAddress': { 'type': 'Edm.String', 'nullable': true },
        'DeliveryZipCode': { 'type': 'Edm.String', 'nullable': true },
        'DeliveryLatitude': { 'type': 'Edm.Double', 'nullable': true },
        'DeliveryLongitude': { 'type': 'Edm.Double', 'nullable': true },
        'Remarks': { 'type': 'Edm.String', 'nullable': true },
        'IdPaymentMethod': { 'type': 'Edm.Guid', 'nullable': true },
        'PaymentMethod': { 'type': 'Edm.String', 'nullable': true },
        'IdPaymentTerm': { 'type': 'Edm.Guid', 'nullable': true },
        'PaymentTerm': { 'type': 'Edm.String', 'nullable': true },
        'PaymentTermValue': { 'type': 'Edm.Int32', 'nullable': true },
        'IdCurrency': { 'type': 'Edm.Guid', 'nullable': true },
        'TotalUnits': { 'type': 'Edm.Int32', 'nullable': false, 'required': true },
        'TotalWithoutVAT': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'TotalWithVAT': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'TotalVATValue': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'State': { 'type': 'Edm.String', 'nullable': true },
        'IsExported': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.PurchaseOrders_Details', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdMaster': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': true },
        'IdProduct': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdMeasurementUnit': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Quantity': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'Price': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'IdVATClass': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'VATClass': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'VATValue': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'TotalWithoutVAT': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'TotalWithVAT': { 'type': 'Edm.Double', 'nullable': true },
        'TotalVATValue': { 'type': 'Edm.Double', 'nullable': true },
        'Remarks': { 'type': 'Edm.String', 'nullable': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Encashments_Headers', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdVisit': { 'type': 'Edm.Guid', 'nullable': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': true },
        'Batch': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Number': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'EncashmentDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdCustomer': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdPayer': { 'type': 'Edm.Guid', 'nullable': true },
        'IdCurrency': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Value': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'Signature': { 'type': 'Edm.String', 'nullable': true },
        'IdReceiptType': { 'type': 'Edm.Guid', 'nullable': true },
        'RequiredReceiptsCount': { 'type': 'Edm.Int32', 'nullable': false, 'required': true },
        'PrintedReceiptsCount': { 'type': 'Edm.Int32', 'nullable': false, 'required': true },
        'ReceiptReferences': { 'type': 'Edm.String', 'nullable': true },
        'State': { 'type': 'Edm.String', 'nullable': true },
        'IsExported': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Encashments_Details', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': true },
        'IdEncashment': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdInvoice': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Invoice': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'IdCurrency': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Value': { 'type': 'Edm.Double', 'nullable': false, 'required': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.Entity.extend('model.Encashments_Receipts', {
        'Id': { 'key': true, 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'InsertDate': { 'type': 'Edm.DateTime', 'nullable': false, 'required': true },
        'IdMaster': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdAgent': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'IdReceiptType': { 'type': 'Edm.Guid', 'nullable': false, 'required': true },
        'Token': { 'type': 'Edm.String', 'nullable': true },
        'ReceiptIndex': { 'type': 'Edm.Int32', 'nullable': true },
        'Batch': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Number': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'Status': { 'type': 'Edm.String', 'nullable': false, 'required': true },
        'StatusDetails': { 'type': 'Edm.String', 'nullable': true },
        'Device': { 'type': 'Edm.String', 'nullable': true },
        'IsAvailableOnMobile': { 'type': 'Edm.Boolean', 'nullable': false, 'required': true },
        '_isDirty': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_isDeleted': { 'type': 'Edm.Boolean', 'nullable': true, 'required': false },
        '_uri': { 'type': 'Edm.String', 'nullable': true, 'required': false },
        '_tempId': { 'type': 'Edm.String', 'nullable': true, 'required': false }
    });

    $data.EntityContext.extend('model.ModelContext', {
        'Users': { type: $data.EntitySet, elementType: model.Users },
        'Users_Settings': { type: $data.EntitySet, elementType: model.Users_Settings },
        'ContactMethods': { type: $data.EntitySet, elementType: model.ContactMethods },
        'PaymentMethods': { type: $data.EntitySet, elementType: model.PaymentMethods },
        'ActivitiesTypes': { type: $data.EntitySet, elementType: model.ActivitiesTypes },
        'Cities': { type: $data.EntitySet, elementType: model.Cities },
        'Countries': { type: $data.EntitySet, elementType: model.Countries },
        'Currencies': { type: $data.EntitySet, elementType: model.Currencies },
        'MeasurementUnits': { type: $data.EntitySet, elementType: model.MeasurementUnits },
        'PaymentTerms': { type: $data.EntitySet, elementType: model.PaymentTerms },
        'ReceiptTypes': { type: $data.EntitySet, elementType: model.ReceiptTypes },
        'Regions': { type: $data.EntitySet, elementType: model.Regions },
        'VATClasses': { type: $data.EntitySet, elementType: model.VATClasses },
        'Stores': { type: $data.EntitySet, elementType: model.Stores },
        'CustomerCategories': { type: $data.EntitySet, elementType: model.CustomerCategories },
        'Customers': { type: $data.EntitySet, elementType: model.Customers },
        'ProductsCategories': { type: $data.EntitySet, elementType: model.ProductsCategories },
        'Products': { type: $data.EntitySet, elementType: model.Products },
        'Stocks': { type: $data.EntitySet, elementType: model.Stocks },
        'Prices': { type: $data.EntitySet, elementType: model.Prices },
        'DiscountSchemas': { type: $data.EntitySet, elementType: model.DiscountSchemas },
        'Visits': { type: $data.EntitySet, elementType: model.Visits },
        'Activities': { type: $data.EntitySet, elementType: model.Activities },
        'PurchaseOrders_Headers': { type: $data.EntitySet, elementType: model.PurchaseOrders_Headers },
        'PurchaseOrders_Details': { type: $data.EntitySet, elementType: model.PurchaseOrders_Details },
        'Encashments_Headers': { type: $data.EntitySet, elementType: model.Encashments_Headers },
        'Encashments_Details': { type: $data.EntitySet, elementType: model.Encashments_Details },
        'Encashments_Receipts': { type: $data.EntitySet, elementType: model.Encashments_Receipts }
    });

    $data.generatedContexts = $data.generatedContexts || [];
    $data.generatedContexts.push(model.ModelContext);

})(window, $data);
