// Google Maps API Configuration
let map;
let marker;
let infoWindow;
let searchBox;

// Sakha Clothing location coordinates
const SAKHA_LOCATION = {
    lat: -6.544764613751721,
    lng: 107.73831818269235
};

// Check if Google Maps API is loaded
function isGoogleMapsLoaded() {
    return typeof google !== 'undefined' && google.maps;
}

// Initialize the map when the page loads
function initMap() {
    console.log('Initializing map...');

    // Check if Google Maps API is available
    if (!isGoogleMapsLoaded()) {
        console.error('Google Maps API not loaded');
        showFallbackMap();
        return;
    }

    try {
        // Hide fallback iframe
        const fallbackMap = document.getElementById('fallback-map');
        if (fallbackMap) {
            fallbackMap.style.display = 'none';
        }

        // Create map instance
        map = new google.maps.Map(document.getElementById('map'), {
            center: SAKHA_LOCATION,
            zoom: 16,
            styles: getCustomMapStyle(),
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        });

        console.log('Map created successfully');

        // Create custom marker
        createCustomMarker();

        // Create info window
        createInfoWindow();

        // Initialize search functionality
        initializeSearch();

        // Add custom controls
        addCustomControls();

        // Add click event to map
        map.addListener('click', function (event) {
            infoWindow.close();
        });

        console.log('Map initialization complete');

    } catch (error) {
        console.error('Error initializing map:', error);
        showFallbackMap();
    }
}

// Show fallback iframe map
function showFallbackMap() {
    console.log('Showing fallback map');
    const fallbackMap = document.getElementById('fallback-map');
    if (fallbackMap) {
        fallbackMap.style.display = 'block';
    }
}

// Create custom marker with animation
function createCustomMarker() {
    try {
        const markerIcon = {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#00d4ff" stroke="#fff" stroke-width="2"/>
                    <circle cx="20" cy="20" r="8" fill="#fff"/>
                    <circle cx="20" cy="20" r="4" fill="#00d4ff"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        };

        marker = new google.maps.Marker({
            position: SAKHA_LOCATION,
            map: map,
            icon: markerIcon,
            title: 'Sakha Clothing',
            animation: google.maps.Animation.DROP
        });

        // Add bounce animation on click
        marker.addListener('click', function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 750);
            infoWindow.open(map, marker);
        });

        console.log('Marker created successfully');
    } catch (error) {
        console.error('Error creating marker:', error);
    }
}

// Create info window with custom content
function createInfoWindow() {
    try {
        const contentString = `
            <div class="info-window">
                <div class="info-header">
                    <h3><i class="fas fa-store"></i> Sakha Clothing</h3>
                </div>
                <div class="info-content">
                    <p><i class="fas fa-map-marker-alt"></i> Jl. Subang - Cidahu No.16, Dangdeur, Kec. Subang, Kabupaten Subang, Jawa Barat 41211</p>
                    <p><i class="fas fa-clock"></i> Senin - Minggu: 09:00 - 21:00</p>
                    <p><i class="fas fa-phone"></i> +62 812-3456-7890</p>
                    <div class="info-actions">
                        <button onclick="getDirections()" class="direction-btn">
                            <i class="fas fa-directions"></i> Petunjuk Arah
                        </button>
                        <button onclick="callStore()" class="call-btn">
                            <i class="fas fa-phone"></i> Telepon
                        </button>
                    </div>
                </div>
            </div>
        `;

        infoWindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
        });

        console.log('Info window created successfully');
    } catch (error) {
        console.error('Error creating info window:', error);
    }
}

// Initialize search functionality
function initializeSearch() {
    try {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        if (!searchInput || !searchBtn) {
            console.warn('Search elements not found');
            return;
        }

        // Create search box
        searchBox = new google.maps.places.SearchBox(searchInput);

        // Bias search results to current map viewport
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Handle search button click
        searchBtn.addEventListener('click', function () {
            performSearch();
        });

        // Handle enter key press
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Listen for search results
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            // Clear existing markers
            if (marker) {
                marker.setMap(null);
            }

            const bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // Create marker for searched location
                const searchMarker = new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                });

                // Create info window for searched location
                const searchInfoWindow = new google.maps.InfoWindow({
                    content: `
                        <div class="info-window">
                            <h3>${place.name}</h3>
                            <p>${place.formatted_address || ''}</p>
                            <button onclick="showRouteToSakha(${place.geometry.location.lat()}, ${place.geometry.location.lng()})" class="direction-btn">
                                <i class="fas fa-directions"></i> Rute ke Sakha Clothing
                            </button>
                        </div>
                    `
                });

                searchMarker.addListener('click', function () {
                    searchInfoWindow.open(map, searchMarker);
                });

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);
        });

        console.log('Search functionality initialized');
    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

// Perform search
function performSearch() {
    try {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: searchInput.value }, function (results, status) {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    map.setCenter(location);
                    map.setZoom(15);
                } else {
                    alert('Lokasi tidak ditemukan. Silakan coba lagi.');
                }
            });
        }
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

// Add custom controls to the map
function addCustomControls() {
    try {
        const customControls = document.createElement('div');
        customControls.className = 'custom-map-controls';
        customControls.innerHTML = `
            <button class="map-control-btn" onclick="resetToSakha()" title="Kembali ke Sakha Clothing">
                <i class="fas fa-home"></i>
            </button>
            <button class="map-control-btn" onclick="toggleMapType()" title="Ganti Tipe Peta">
                <i class="fas fa-layer-group"></i>
            </button>
        `;

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControls);

        console.log('Custom controls added');
    } catch (error) {
        console.error('Error adding custom controls:', error);
    }
}

// Reset map to Sakha Clothing location
function resetToSakha() {
    try {
        map.setCenter(SAKHA_LOCATION);
        map.setZoom(16);
        infoWindow.open(map, marker);

        // Add animation effect
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 750);
    } catch (error) {
        console.error('Error resetting to Sakha:', error);
    }
}

// Toggle map type
function toggleMapType() {
    try {
        const currentMapType = map.getMapTypeId();
        if (currentMapType === google.maps.MapTypeId.ROADMAP) {
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        } else {
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
    } catch (error) {
        console.error('Error toggling map type:', error);
    }
}

// Get directions to Sakha Clothing
function getDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${SAKHA_LOCATION.lat},${SAKHA_LOCATION.lng}&travelmode=driving`;
    window.open(url, '_blank');
}

// Show route from current location to Sakha Clothing
function showRouteToSakha(fromLat, fromLng) {
    const url = `https://www.google.com/maps/dir/${fromLat},${fromLng}/${SAKHA_LOCATION.lat},${SAKHA_LOCATION.lng}`;
    window.open(url, '_blank');
}

// Call store function
function callStore() {
    window.open('tel:+6281234567890', '_self');
}

// Custom map style
function getCustomMapStyle() {
    return [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "2.00"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9c9c9c"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7b7b7b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8d7d4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#070707"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        }
    ];
}

// Form handling
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, setting up form...');

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Mohon lengkapi semua field!');
                return;
            }

            // Show success message
            showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');

            // Reset form
            contactForm.reset();
        });

        console.log('Form setup complete');
    }

    // Check if Google Maps API is loaded after DOM is ready
    setTimeout(() => {
        if (!isGoogleMapsLoaded()) {
            console.warn('Google Maps API not loaded after timeout, showing fallback');
            showFallbackMap();
        }
    }, 3000);
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .info-window {
        font-family: 'Poppins', sans-serif;
        padding: 10px;
    }
    
    .info-window h3 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 1.1rem;
    }
    
    .info-window p {
        margin: 5px 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .info-actions {
        margin-top: 15px;
        display: flex;
        gap: 10px;
    }
    
    .direction-btn, .call-btn {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
    }
    
    .direction-btn {
        background: #00d4ff;
        color: white;
    }
    
    .call-btn {
        background: #4CAF50;
        color: white;
    }
    
    .direction-btn:hover, .call-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Initialize map when Google Maps API is loaded
window.initMap = initMap;

// Debug function to check API status
window.checkMapStatus = function () {
    console.log('Google Maps API loaded:', isGoogleMapsLoaded());
    console.log('Map object:', map);
    console.log('Marker object:', marker);
    console.log('Info window object:', infoWindow);
}; 