const vliteProviders = {}
const providersOptions = {}

/**
 * Get provider instance from the registered list
 * @param provider Provider ID
 * @param Player Player parent class
 * @returns Provider class
 */
export function getProviderInstance(provider, Player) {
	const ProviderInstance = vliteProviders[provider]
	if (ProviderInstance) {
		return ProviderInstance(Player, providersOptions[provider])
	}
	throw new Error(`storelocatorjs :: Unknown provider "${provider}"`)
}

/**
 * Register the provider
 * @param id Provider ID
 * @param instance Provider instance
 * @param options Provider options
 * @returns No value to return
 */
export function registerProvider(id, instance, options) {
	if (typeof instance !== 'undefined') {
		if (!Object.keys(vliteProviders).includes(id)) {
			vliteProviders[id] = instance

			if (options) {
				providersOptions[id] = options
			}
			return
		}
		throw new Error(`storelocatorjs :: The provider id "${id}" is already registered.`)
	}
	throw new Error(`storelocatorjs :: The provider id "${id}" is undefined.`)
}
