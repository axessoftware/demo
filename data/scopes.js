window.app.data.scopes = {
	'UsersScope': {
		entities: {
			'Users': {
			},
			'Users_Settings': {
			}
		},
		service: 'UsersScopeSyncService.svc',
		caption: 'Users',
		name: 'UsersScope'
	},
	'StaticsScope': {
		entities: {
			'ContactMethods': {
			},
			'PaymentMethods': {
			},
			'ActivitiesTypes': {
			},
			'Cities': {
			},
			'Countries': {
			},
			'Currencies': {
			},
			'MeasurementUnits': {
			},
			'PaymentTerms': {
			},
			'ReceiptTypes': {
			},
			'Regions': {
			},
			'VATClasses': {
			}
		},
		service: 'StaticsScopeSyncService.svc',
		caption: 'Statics',
		name: 'StaticsScope'
	},
	'GlossariesScope': {
		entities: {
			'Stores': {
			},
			'CustomerCategories': {
			},
			'Customers': {
				filters: ['IdAgent']
			},
			'ProductsCategories': {
			},
			'Products': {
			}
		},
		service: 'GlossariesScopeSyncService.svc',
		caption: 'Glossaries',
		name: 'GlossariesScope'
	},
	'FinancialScope': {
		entities: {
			'Stocks': {
			},
			'Prices': {
			},
			'DiscountSchemas': {
			}
		},
		service: 'FinancialScopeSyncService.svc',
		caption: 'Financial',
		name: 'FinancialScope'
	},
	'ActivitiesScope': {
		entities: {
			'Visits': {
				filters: ['IdAgent']
			},
			'Activities': {
				filters: ['IdAgent']
			},
			'PurchaseOrders_Headers': {
				filters: ['IdAgent']
			},
			'PurchaseOrders_Details': {
				filters: ['IdAgent']
			},
			'Encashments_Headers': {
				filters: ['IdAgent']
			},
			'Encashments_Details': {
				filters: ['IdAgent']
			},
			'Encashments_Receipts': {
				filters: ['IdAgent']
			}
		},
		service: 'ActivitiesScopeSyncService.svc',
		caption: 'Activities',
		name: 'ActivitiesScope'
	}
};
