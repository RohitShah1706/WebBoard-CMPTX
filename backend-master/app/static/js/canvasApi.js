function quadraticCurveTo(a,r,o,e,n,i=0,d=0,t=boardArea.margin_x,c=boardArea.margin_y,b=boardArea.scale){r*=b,o*=b,e*=b,n*=b,a.quadraticCurveTo(t+r+i,c+o+d,t+e+i,c+n+d)}function moveTo(a,r,o,e=0,n=0,i=boardArea.margin_x,d=boardArea.margin_y,t=boardArea.scale,c=!1){var b=r*t,u=o*t;a.moveTo(i+b+e,d+u+n)}function lineTo(a,r,o,e=0,n=0,i=boardArea.margin_x,d=boardArea.margin_y,t=boardArea.scale){var c=r*t,b=o*t;a.lineTo(i+c+e,d+b+n)}function arc(a,r,o,e,n,i=0,d=0,t=0,c=2*Math.PI,b=boardArea.margin_x,u=boardArea.margin_y,A=boardArea.scale,m=!0){var g=r*A,s=o*A,_=e*A,h=n*A;radius=Math.sqrt(Math.pow(_-g,2)+Math.pow(h-s,2)),a.arc(b+g+i,u+s+d,radius,t,c,m)}function correctWidth(a,r=boardArea.scale){return Math.max(1,Math.round(a*r))}