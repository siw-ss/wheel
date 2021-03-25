var padding = {top:20, right:40, bottom:0, left:0},
            w = 520 - padding.left - padding.right,
            h = 520 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            count = 0,
            picked = 100000,
            // oldpick = [],
            color = d3.scale.ordinal()
              .domain(['0','1','2','3','4','5','6','7','8'])
              .range(['#F9EECF','#4D2971','#FFFFFF','#4D2971','#F9EECF','#4D2971','#ffffff','#4D2971']);//category20c()
            //randomNumbers = getRandomNumbers();['#fa7f44','#f16522','#de5a40','#d22032','#d22032','#e9b755','#f3994e','#f2d4a9']


        var data = [
                    {"label":"voiture toyota corolla",  "value":1,  "offer":"Dear client you won  voiture toyota corolla"}, // padding
                    {"label":"Kit marchand sobflous",  "value":1,  "offer":"Dear client you won Kit marchand sobflous"}, //font-family
                    {"label":"bon d'achat de notre partenaire zen 200 dt",  "value":1,  "offer":"Dear client you won bon d'achat de notre partenaire zen 200 dt"}, //color
                    {"label":"100 dt ajouter au compte Sobflous",  "value":1,  "offer":"Dear client you won 100 dt ajouter au compte Sobflous"}, //font-weight
                    {"label":"Perdue",  "value":1,  "offer":"You have got Better luck, next time!"}, //font-size
                    {"label":"Voucher d'achat ",  "value":1,  "offer":"Dear client you won  Voucher d'achat"}, //background-color
                    {"label":"1 dt ajouter au compte Sobflous",  "value":1,  "offer":"Dear client you won  1 dt ajouter au compte Sobflous"}, //nesting
                    {"label":"5 dt ajouter au compte Sobflous",  "value":1,  "offer":"Dear client you won 5 dt ajouter au compte Sobflous"} //bottom
        ];


        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right + 80)
            .attr("height", h + padding.top + padding.bottom + 80);

        var defs = svg.append("defs");

        // create filter with id #drop-shadow
        // height=130% so that the shadow is not clipped
        var filter = defs.append("filter")
            .attr("id", "drop-shadow")
            .attr("height", "130%");

        filter.append("feColorMatrix")
            .attr("in", "SourceAlpha")
            .attr("type", "saturate")
            .attr("values", "0.25");

        // SourceAlpha refers to opacity of graphic that this filter will be applied to
        // convolve that with a Gaussian with standard deviation 3 and store result
        // in blur
        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 5)
            .attr("result", "blur");

        // translate output of Gaussian blur to the right and downwards with 2px
        // store result in offsetBlur
        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 5)
            .attr("dy", 5)
            .attr("result", "offsetBlur");

        // overlay original SourceGraphic over translated blurred opacity by using
        // feMerge filter. Order of specifying inputs is important!
        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");


            // create filter with id #drop-shadow for selected slice
            // height=130% so that the shadow is not clipped

            var filter_slice = defs.append("filter")
                .attr("id", "drop-shadow-selected-slice")
                .attr("height", "130%");

            filter_slice.append("feColorMatrix")
                .attr("in", "SourceAlpha")
                .attr("type", "saturate")
                .attr("values", "0.25");

            // SourceAlpha refers to opacity of graphic that this filter will be applied to
            // convolve that with a Gaussian with standard deviation 3 and store result
            // in blur
            filter_slice.append("feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 10)
                .attr("result", "blur");

            // translate output of Gaussian blur to the right and downwards with 2px
            // store result in offsetBlur
            filter_slice.append("feOffset")
                .attr("in", "blur")
                .attr("dx", 0.5)
                .attr("dy", 0.5)
                .attr("result", "offsetBlur");

            // overlay original SourceGraphic over translated blurred opacity by using
            // feMerge filter. Order of specifying inputs is important!
            var feMerge_slice = filter_slice.append("feMerge");

            feMerge_slice.append("feMergeNode")
                .attr("in", "offsetBlur")
            feMerge_slice.append("feMergeNode")
                .attr("in", "SourceGraphic");

          // filter for inner-circle
          var filter_inner_circle = defs.append("filter")
              .attr("id", "drop-shadow-inner-circle")
              .attr("height", "120%");

          filter_inner_circle.append("feColorMatrix")
              .attr("in", "SourceAlpha")
              .attr("type", "saturate")
              .attr("values", "0.25");
//---------BD CHANGE HERE (stores in blur)---------
          // SourceAlpha refers to opacity of graphic that this filter will be applied to
          // convolve that with a Gaussian with standard deviation 3 and store result
          // in blur
          filter_inner_circle.append("feGaussianBlur")
              .attr("in", "SourceAlpha")
              .attr("stdDeviation", 5)
              .attr("result", "blur");

          // translate output of Gaussian blur to the right and downwards with 2px
          // store result in offsetBlur
          filter_inner_circle.append("feOffset")
              .attr("in", "blur")
              .attr("dx", 1)
              .attr("dy", 1)
              .attr("result", "offsetBlur");

          // overlay original SourceGraphic over translated blurred opacity by using
          // feMerge filter. Order of specifying inputs is important!
          var feMerge_inner_circle = filter_inner_circle.append("feMerge");

          feMerge_inner_circle.append("feMergeNode")
              .attr("in", "offsetBlur")
          feMerge_inner_circle.append("feMergeNode")
              .attr("in", "SourceGraphic");

        var outercontainer = svg.append("g")
            .attr("class", "chartholder-outer")
            .attr("transform", "translate(" + (w/2 + padding.left+30) + "," + ((h/2) + padding.top ) + ")")
            .style("fill-opacity","0.8");
//--------the white outsider border-------
      outercontainer.append("circle")
           .attr("cx", 31)
           .attr("cy", 31)
           .attr("r", 200)
           .style({"fill":"#ffffff","cursor":"pointer"});
//--------the yellow one-------
        outercontainer.append("circle")
             .attr("cx", 31)
             .attr("cy", 31)
             .attr("r", 20)
             .style({"fill":"#FFCD07","cursor":"pointer","filter": "url(#drop-shadow)"});
        outercontainer.append("svg:image")
            .attr("xlink:href", "contour.png")
            .attr("x", -233)
            .attr("y", -235)
            .attr("r",200)
            .attr('width', 530)
            .attr('height', 530)



        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left+61) + "," + (h/2 + padding.top+31) + ")");

        var vis = container
            .append("g");

        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        createArcs();

        container.append("svg:image")
            .attr("xlink:href", "fleche.png")
            .attr("x", 200)
            .attr("y", -55)
            .attr('width', 100)
            .attr('height', 100)


        function createArcs(){

          console.log('reached create arc');
          // select paths, use arc generator to draw
          var arcs = vis.selectAll("g.slice")
              .data(pie)
              .enter()
              .append("g")
              .attr("class", "slice");

          arcs.append("path")
              .attr("fill", function(d, i){
                return color(i); })
              // .attr("stroke","#ffffff")
              .attr("d", function (d) { return arc(d); });

          // add the text
          arcs.append("text").attr("transform", function(d){
                  d.innerRadius = 0;
                  d.outerRadius = r;
                  d.angle = (d.startAngle + d.endAngle)/2;
                  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
              })
              .attr("text-anchor", "end")
              .text( function(d, i) {
                  return data[i].label;
              })
              .style({"font-size":"14px","font-weight":"bold"});
        };

        function randomNumber(minimum, maximum){
            var Daly =Math.random();
            switch(true) {
              case  (Daly<0.3):return 4;
              break;
              case (Daly<0.4):return 2;
              break;
              case (Daly< 0.6):return 3;
              break;
              case (Daly <0.62):return 8;
              break;
              case (Daly< 0.7) : return 5;
              break;  
              case  (Daly <0.85) : return 6 ;
              break;
             case ( Daly<0.95) : return 7;
              break;
              case (Daly< 0.99) : return 1;
              break;
              default: return 4;
             break;}
        }

        function spin(d){
            rotation = 0;
            count++;
            if(count > 3){
              alert('Please try again after n orders');
              return;
            }
            if(picked !== 100000){
              console.log('reached contains picked',picked,color[picked]);
              d3.selectAll("g.slice path")
                  .attr("fill-opacity","1");
              d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                  .attr("fill", function(d, i){
                    return color(picked); })
                    .attr("stroke","none")
                    .attr("filter","none");

              d3.select(".inner-circle")
                  .attr("style","fill: #ffffff;cursor:pointer;");

              d3.select(".inner-circle-text-1")
                  .transition()
                  .style("fill","#000000");

              d3.select(".inner-circle-text-2")
                  .transition()
                  .style("fill","#000000");
            }

            createArcs();
            new_container.on("click", null);

            //all slices have been seen, all done
            // console.log("OldPick, Data length: " , oldpick,data);
            // if(oldpick.length == data.length){
            //     console.log("done");
            //     new_container.on("click", null);
            //     return;
            // }

            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length);
                //  rng      = Math.floor((Math.random() * 1440));


            // picked = Math.round(data.length - (rotation % 360)/ps);
            // picked = picked >= data.length ? (picked % data.length) : picked;
            picked = randomNumber(0,6);
            rotation =  7200 - (picked+1) * ps + 120;
            console.log('ps, pieslice, rotation, picked',ps,pieslice,rotation,picked);


            // if(oldpick.indexOf(picked) !== -1){
            //     spin();
            //     return;
            // } else {
            //     oldpick.push(picked);
            // }

            // rotation += 90 - Math.round(ps/2);
            console.log('dsdasd',90 - Math.round(ps/2));

            console.log('new rotation',rotation);

            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){

                    // //mark offer as seen
                    var arcs = vis.selectAll("g.slice path");
                    arcs.transition()
                    arcs.attr("fill-opacity", "0.5");

                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .transition()
                        .attr("fill-opacity","1")
                        .attr("fill", "#a54d9d")
                        .attr("stroke","#ffffff")
                        .attr("filter","url(#drop-shadow-selected-slice)");


                    d3.select(".inner-circle")
                        .transition()
                        .attr("style","fill: #F9EECF;cursor:pointer;");

                    d3.select(".inner-circle-text-1")
                        .transition()
                        .text("Try")
                        //.style("fill","#000000");

                    d3.select(".inner-circle-text-2")
                        .transition()
                        .text("Again")
                        //.style("fill","#fffffff");
                    //populate offer

                    // populate selcted message if it is an array

                    // var selected_offer_message_length =  data[picked].offer.length;
                    // for(var j=0; j<selected_offer_message_length;j++){
                    //   d3.select("#offer .selected-message")
                    //       .append("text")
                    //       .attr("class","selected-message-list")
                    //       .text(data[picked].offer);
                    // }

                    d3.select("#offer .selected-message")
                        .text(data[picked].offer);

                    oldrotation = rotation;

                    new_container.on("click", spin);
                });
        }

        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right + 51) + "," + ((h/2)+padding.top+31) + ")")
            .append("path")
            .attr("d", "M-" + (r*.1) + ",0L0," + (r*.08) + "L0,-" + (r*.08) + "Z")
            .style({"fill":"#4D2971","stroke":"#FFCD07","stroke-width":"0"});
        

        //draw spin circle
       var new_container = container.append("g");
       new_container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 20)
            .style({"fill":"black","cursor":"pointer"});

      new_container.append("circle")
           .attr("cx", 0)
           .attr("cy", 0)
           .attr("r", 40)
           .attr("class","inner-circle")
           .attr("filter","url(#drop-shadow-inner-circle)")
           .style({"fill":"#F9EECF","cursor":"pointer"});
      // click on to spin the wheel
      new_container.on("click", spin);

      new_container.append("svg:image")
      .attr("x", -45)
      .attr("y", -55)
      .attr('width', 100)
      .attr('height', 100)
      .attr("xlink:href", "sob.png")

        //spin text
     /* new_container.append("text")
          .attr("x", -2)
          .attr("y", 0)
          .attr("text-anchor", "middle")
          .attr("class", "inner-circle-text-1")
          .text("Press")
          .style({"font-weight":"bold", "font-size":"15px","fill":"#000000"});

      new_container.append("text")
          .attr("x", 3)
          .attr("y", 18)
          .attr("text-anchor", "middle")
          .attr("class", "inner-circle-text-2")
          .text("& Win *")
          .style({"font-weight":"bold", "font-size":"15px","fill":"#000000"});
        */  
     


        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2) + ")";
          };
        }


        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }

            return array;
        }
