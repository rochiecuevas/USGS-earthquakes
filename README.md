# 24-hour Earthquake Monitoring
The United States Geological Survey (USGS) Earthquake Hazards Programme provides real-time data about earthquakes. __Today's Earthquakes__ maps the [earthquake data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) collected by the USGS for the past 24 hours (updated every five minutes), and provides their magnitudes, significance, and depths.

The map has three tile layers corresponding to different ways to view terrain and geography information (dark ,satellite, and street). Earthquake information is overlaid as circles such that whatever tile layer is chosen, earthquake locations are included in the rendering.

![quake-map](https://github.com/rochiecuevas/USGS-earthquakes/blob/master/Screenshots/quake_map.png)

The legend is set from 1 to >8 as this is the range of [earthquake magnitudes](https://www.britannica.com/science/earthquake-geology/Earthquake-magnitude). The legend and the circles are colour-coded based on the magnitude of each earthquake. Also, the size of the circles are based on the earthquakes they represent.

__Today's Earthquakes__ opens with introductory text explaining the contents of the map. It has a "Start" button that the reader can click to direct him/her to the latest version of the map.

![hero-section](https://github.com/rochiecuevas/USGS-earthquakes/blob/master/Screenshots/hero_section.png)

__Today's Earthquakes__, like the USGS data, is updated every five minutes. To see today's