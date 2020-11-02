const distance = (lat1: number, lon1: number, lat2: number, lon2: number ): number => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0
	}
	else {
		const radlat1 = Math.PI * lat1/180
		const radlat2 = Math.PI * lat2/180
		const theta = lon1-lon2
		const radtheta = Math.PI * theta/180
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
		if (dist > 1) {
			dist = 1
		}
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    // Convert the distance to killometers as default distance is in miles
    dist = dist * 1.609344
		return Math.round(dist*100)/100
	}
}

export default distance
