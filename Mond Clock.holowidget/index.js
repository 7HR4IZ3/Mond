export default {
  extends: HologramWidget,
  data() {
    return {
      day: dayjs(),
    };
  },
  mounted() {
    this.importFonts();

    // Load the widget colors and assign them to css variables
    this.fetchAllColors((colors) => {
      this.addCssVariables(colors);
    });

    Hologram.timer.everyMinute(this, () => {
        this.day = dayjs();
    });
  },
  methods: {
    importFonts() {
      const fonts = [
        {
          name: "Anurati",
          url: this.asset("fonts/Anurati.otf"),
        },
        {
          name: "Quicksand",
          url: this.asset("fonts/Quicksand.otf"),
        },
        {
          name: "Aquatico",
          url: this.asset("fonts/Aquatico.otf"),
        },
      ];

      for (const font of fonts) {
        // Import the font from the widget settings
        const fontFace = new FontFace(
          font.name,
          `url(${font.url}) format('opentype')`
        );

        fontFace
          .load()
          .then(function (loadedFace) {
            document.fonts.add(loadedFace);
          })
          .catch(function (error) {
            console.error("Font loading failed:", error);
          });
      }
    },
  },
  template: /*html*/ `
        <div class="widget-container">
            <div class="widget-container-inner">
                <div class="day" :style="{'font-family': settings.dayFont}">
                    {{ day.format('dddd').split('').join(' ') }}
                </div>

                <div class="date" :style="{'font-family': settings.dateFont}">
                    {{ day.format('DD MMMM, YYYY.') }}
                </div>

                <div class="time" :style="{'font-family': settings.timeFont}">
                    - {{ day.format('HH:mm') }} -
                </div>
            </div>
        </div>
    `,
};
