require "fileutils"
require "csv"

ROOT = File.expand_path("..", __dir__)
DS_ROOT = "/Users/reginaldsmit/Desktop/ethny/ethny 2.0 /Graphisme/Logo ( identité visuelle ) /Charte graphique/Ethny Nomad Cuisine Design System"
ICON_SOURCE = File.join(DS_ROOT, "components/icons/Icon.jsx")
LOGO_SOURCE = File.join(DS_ROOT, "assets/logo")

COLORS = {
  deep_green: "#1C3B34",
  forest: "#285447",
  sage: "#5E8D7A",
  cream: "#F2EBDC",
  beige: "#E7DDC8",
  stone: "#C9C5BB",
  anthracite: "#2A2A2A",
  white: "#FFFFFE",
  forest_tint_20: "#CACDBE",
  sage_tint_15: "#DCDDCD",
  stone_tint_40: "#E2DCCF"
}

MANIFEST = []

def write_file(folder, filename, label, source, content)
  dir = File.join(ROOT, folder)
  FileUtils.mkdir_p(dir)
  File.write(File.join(dir, filename), content.strip + "\n")
  MANIFEST << [folder, filename, label, source]
end

def svg(width, height, body, attrs = "")
  %(<svg xmlns="http://www.w3.org/2000/svg" width="#{width}" height="#{height}" viewBox="0 0 #{width} #{height}" #{attrs}>#{body}</svg>)
end

def safe_name(name)
  name.to_s.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/^-|-$/, "")
end

def copy_official_logos
  Dir.glob(File.join(LOGO_SOURCE, "*.svg")).sort.each do |source|
    target = "ethny-official-#{File.basename(source)}"
    FileUtils.cp(source, File.join(ROOT, "01_logos", target))
    MANIFEST << ["01_logos", target, "Official design-system logo", source]
  end
end

def extract_icons
  src = File.read(ICON_SOURCE)
  src.scan(/^\s{2}([a-z0-9_]+):\s*'([^']+)'/).each do |name, inner|
    body = %(<g fill="none" stroke="#{COLORS[:forest]}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">#{inner}</g>)
    write_file(
      "02_pictogrammes",
      "ethny-picto-#{name}.svg",
      "Official pictogram #{name}",
      ICON_SOURCE,
      svg(24, 24, body, %(role="img" aria-label="ethny pictogram #{name}"))
    )
  end
end

def write_brand_motifs
  motifs = {
    "courbes" => %(<path d="M10 20a14 14 0 0 1 28 0"/><path d="M10 30a14 14 0 0 0 28 0"/>),
    "feuille" => %(<path d="M24 6C10 14 8 30 24 42C40 30 38 14 24 6Z"/><path d="M24 10V38"/>),
    "ramure" => %(<path d="M24 42V18M24 18l-8-10M24 18l8-10M18 26l-6-4M30 26l6-4"/>),
    "rond-brise" => %(<circle cx="24" cy="24" r="15" stroke-dasharray="6 4"/>)
  }

  source = File.join(DS_ROOT, "guidelines/brand/pictogram-motifs.card.html")
  motifs.each do |name, body|
    write_file(
      "07_motifs",
      "ethny-motif-officiel-#{name}.svg",
      "Official brand motif #{name}",
      source,
      svg(48, 48, %(<g fill="none" stroke="#{COLORS[:forest]}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">#{body}</g>), %(role="img" aria-label="ethny motif #{name}"))
    )
  end
end

class Mulberry32
  def initialize(seed)
    @a = seed & 0xffffffff
  end

  def call
    @a = (@a + 0x6D2B79F5) & 0xffffffff
    t = @a
    t = (((t ^ (t >> 15)) * (1 | t)) & 0xffffffff)
    t = (t + (((t ^ (t >> 7)) * (61 | t)) & 0xffffffff)) & 0xffffffff
    ((t ^ (t >> 14)) & 0xffffffff).to_f / 4_294_967_296.0
  end
end

def closed_loop(cx, cy, radius, wobble, n, rot, rng)
  pts = []
  n.times do |i|
    a = rot + (i.to_f / n) * Math::PI * 2
    r = radius + (rng.call - 0.5) * 2 * wobble
    pts << [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.82]
  end
  d = "M #{pts[0][0].round(1)} #{pts[0][1].round(1)} "
  n.times do |i|
    p0 = pts[(i - 1 + n) % n]
    p1 = pts[i]
    p2 = pts[(i + 1) % n]
    p3 = pts[(i + 2) % n]
    c1x = p1[0] + (p2[0] - p0[0]) / 6.0
    c1y = p1[1] + (p2[1] - p0[1]) / 6.0
    c2x = p2[0] - (p3[0] - p1[0]) / 6.0
    c2y = p2[1] - (p3[1] - p1[1]) / 6.0
    d += "C #{c1x.round(1)} #{c1y.round(1)} #{c2x.round(1)} #{c2y.round(1)} #{p2[0].round(1)} #{p2[1].round(1)} "
  end
  d + "Z"
end

def contour_cluster(cx, cy, rings, base_r, gap, wobble, rng)
  out = []
  rot = rng.call * Math::PI
  rings.times do |i|
    out << closed_loop(cx, cy, base_r + i * gap, wobble * (1 - i.to_f / (rings * 2)), 9, rot + i * 0.05, rng)
  end
  out
end

def wave(y, amp, freq, phase, width)
  d = "M -20 #{y.round(1)} "
  x = 0
  while x <= width + 20
    yy = y + Math.sin((x.to_f / width) * Math::PI * 2 * freq + phase) * amp
    d += "L #{x} #{yy.round(1)} "
    x += 40
  end
  d
end

def graticule(width, height, warp, spacing)
  out = []
  x = spacing
  while x < width
    d = "M #{x} -20 "
    y = -20
    while y <= height + 20
      xx = x + Math.sin((y.to_f / height) * Math::PI * 3 + x) * warp
      d += "L #{xx.round(1)} #{y} "
      y += 40
    end
    out << d
    x += spacing
  end
  y = spacing
  while y < height
    d = "M -20 #{y} "
    x2 = -20
    while x2 <= width + 20
      yy = y + Math.sin((x2.to_f / width) * Math::PI * 3 + y) * warp
      d += "L #{x2} #{yy.round(1)} "
      x2 += 40
    end
    out << d
    y += spacing
  end
  out
end

def veins(cx, cy, len, branches, rng)
  out = []
  out << "M #{cx} #{cy + len / 2} C #{cx - 12} #{cy + len / 4} #{cx + 12} #{cy - len / 4} #{cx} #{cy - len / 2}"
  branches.times do |i|
    t = (i + 1).to_f / (branches + 1)
    y = cy + len / 2 - t * len
    side = i.odd? ? 1 : -1
    bl = (0.28 + rng.call * 0.22) * len * (1 - t * 0.4)
    out << "M #{cx} #{y.round(1)} Q #{(cx + side * bl * 0.5).round(1)} #{(y - bl * 0.4).round(1)} #{(cx + side * bl).round(1)} #{(y - bl * 0.7).round(1)}"
  end
  out
end

def stroke_group(paths, color, opacity, width)
  %(<g fill="none" stroke="#{color}" opacity="#{opacity}" stroke-width="#{width}" stroke-linecap="round" stroke-linejoin="round">#{paths.map { |d| %(<path d="#{d}"/>) }.join}</g>)
end

def build_signature_variant(variant, seed = 7, color = COLORS[:cream])
  w = 1600
  h = 900
  rng = Mulberry32.new(seed)
  layers = +""
  case variant
  when "exploration"
    waves = []
    7.times { |i| waves << wave(120 + i * 105, 16 + rng.call * 10, 1.3 + rng.call * 0.5, rng.call * 6, w) }
    wind = []
    5.times { |i| wind << wave(200 + i * 150, 5, 2.4, rng.call * 6, w) }
    layers << stroke_group(graticule(w, h, 10, 260), color, 0.05, 1)
    layers << stroke_group(waves, color, 0.08, 1.4)
    layers << stroke_group(wind, color, 0.03, 0.8)
    layers << stroke_group(contour_cluster(1230, 250, 5, 60, 26, 20, rng), color, 0.05, 1)
  when "topographie"
    c = []
    [[380, 300], [1120, 560], [820, 180], [1350, 300]].each_with_index do |(x, y), i|
      c += contour_cluster(x, y, 6 + (i % 2), 46 + i * 8, 30, 26, rng)
    end
    layers << stroke_group(graticule(w, h, 8, 300), color, 0.03, 0.8)
    layers << stroke_group(c, color, 0.07, 1.2)
  when "vegetal"
    v = []
    [[300, 480], [900, 260], [1300, 620], [640, 720]].each do |x, y|
      v += veins(x, y, 300 + rng.call * 120, 5, rng)
    end
    fine = []
    6.times { |i| fine << wave(140 + i * 130, 8, 1.1, rng.call * 6, w) }
    layers << stroke_group(fine, color, 0.03, 0.8)
    layers << stroke_group(v, color, 0.07, 1.1)
  when "geometrie"
    g = []
    x = -200
    while x < w
      g << "M #{x} 0 L #{x + h} #{h}"
      x += 130
    end
    x = 0
    while x < w + 200
      g << "M #{x} 0 L #{x - h} #{h}"
      x += 130
    end
    dots = []
    y = 130
    while y < h
      x = 130
      while x < w
        dots << closed_loop(x, y, 4, 0, 8, 0, rng)
        x += 130
      end
      y += 130
    end
    layers << stroke_group(g, color, 0.03, 0.8)
    layers << stroke_group(dots, color, 0.06, 1)
  else
    lines = []
    4.times { |i| lines << wave(220 + i * 170, 10, 0.8, rng.call * 6, w) }
    layers << stroke_group(lines, color, 0.05, 1)
  end
  svg(w, h, layers, %(preserveAspectRatio="xMidYMid slice" role="img" aria-label="ethny signature field #{variant}"))
end

def write_signature_fields
  source = File.join(DS_ROOT, "ui_kits/website/Textures.jsx")
  %w[exploration topographie vegetal geometrie minimal].each do |variant|
    motif = build_signature_variant(variant, 7, COLORS[:cream])
    write_file("06_textures", "ethny-texture-officielle-#{variant}-cream-on-transparent.svg", "Official texture #{variant}", source, motif)
    body = %(<rect width="1600" height="900" fill="#{COLORS[:deep_green]}"/>#{motif.sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")})
    write_file("12_arriere-plans", "ethny-bg-officiel-#{variant}-vert-profond.svg", "Official background #{variant}", source, svg(1600, 900, body, %(role="img" aria-label="ethny official background #{variant}")))
  end
end

def write_contour_field
  paths = 6.times.map do |i|
    y = 60 + i * 55
    %(<path d="M -40 #{y} Q 200 #{10 + i * 55} 400 #{y} T 840 #{y}" fill="none" stroke="rgba(40,84,71,0.14)" stroke-width="1.2"/>)
  end.join
  source = File.join(DS_ROOT, "ui_kits/website/Motifs.jsx")
  write_file("07_motifs", "ethny-motif-officiel-contour-field.svg", "Official ContourField motif", source, svg(800, 400, paths, %(preserveAspectRatio="none" role="img" aria-label="ethny official contour field")))
end

def text_node(text, x, y, attrs = "")
  %(<text x="#{x}" y="#{y}" #{attrs}>#{text}</text>)
end

def badge_svg(label, fill, color, stroke = "transparent")
  width = [label.length * 10 + 42, 132].max
  body = %(<rect x="1" y="1" width="#{width - 2}" height="34" rx="3" fill="#{fill}" stroke="#{stroke}" stroke-width="1"/>) +
    text_node(label.upcase, width / 2, 23, %(text-anchor="middle" fill="#{color}" font-family="Jost, sans-serif" font-size="10" font-weight="500" letter-spacing="1.6"))
  svg(width, 36, body, %(role="img" aria-label="ethny badge #{safe_name(label)}"))
end

def write_badges
  source = File.join(DS_ROOT, "components/core/Badge.jsx")
  examples = [
    ["chef-prive-solid-forest", "Chef prive", COLORS[:deep_green], COLORS[:cream], COLORS[:deep_green]],
    ["traiteur-solid-sage", "Traiteur", COLORS[:sage], COLORS[:deep_green], COLORS[:sage]],
    ["fusion-soft-forest", "Fusion", COLORS[:forest_tint_20], COLORS[:deep_green], "transparent"],
    ["cuisine-locale-soft-sage", "Cuisine locale", COLORS[:sage_tint_15], COLORS[:forest], "transparent"],
    ["evenement-outline-forest", "Evenement", "transparent", COLORS[:deep_green], COLORS[:deep_green]],
    ["mariage-outline-stone", "Mariage", "transparent", COLORS[:anthracite], COLORS[:stone]],
    ["cours-solid-stone", "Cours", COLORS[:anthracite], COLORS[:cream], COLORS[:anthracite]],
    ["private-dining-outline-forest", "Private Dining", "transparent", COLORS[:deep_green], COLORS[:deep_green]]
  ]

  examples.each do |name, label, fill, color, stroke|
    write_file("10_badges", "ethny-badge-officiel-#{name}.svg", "Static Canva export from official Badge component", source, badge_svg(label, fill, color, stroke))
  end
end

def button_svg(label, fill, color, stroke, width, disabled = false, underline = false)
  opacity = disabled ? 0.4 : 1
  if underline
    body = text_node(label, 12, 24, %(fill="#{color}" font-family="Jost, sans-serif" font-size="15" font-weight="500" letter-spacing="0.6")) +
      %(<line x1="12" y1="31" x2="#{width - 12}" y2="31" stroke="#{COLORS[:sage]}" stroke-width="1.5"/>)
    return svg(width, 40, %(<g opacity="#{opacity}">#{body}</g>), %(role="img" aria-label="ethny button #{safe_name(label)}"))
  end

  body = %(<rect x="1" y="1" width="#{width - 2}" height="48" rx="10" fill="#{fill}" stroke="#{stroke}" stroke-width="1.5"/>) +
    text_node(label, width / 2, 30, %(text-anchor="middle" fill="#{color}" font-family="Jost, sans-serif" font-size="14" font-weight="500" letter-spacing="0.6"))
  svg(width, 50, %(<g opacity="#{opacity}">#{body}</g>), %(role="img" aria-label="ethny button #{safe_name(label)}"))
end

def write_buttons
  source = File.join(DS_ROOT, "components/core/Button.jsx")
  buttons = [
    ["primary-lg-demander-proposition", "Demander une proposition", COLORS[:deep_green], COLORS[:cream], COLORS[:deep_green], 260, false, false],
    ["secondary-lg-voir-menus", "Voir les menus", COLORS[:sage], COLORS[:deep_green], COLORS[:sage], 180, false, false],
    ["outline-lg-en-savoir-plus", "En savoir plus", "transparent", COLORS[:deep_green], COLORS[:deep_green], 170, false, false],
    ["dark-md-recevoir-devis", "Recevoir un devis", COLORS[:anthracite], COLORS[:cream], COLORS[:anthracite], 180, false, false],
    ["ghost-md-details", "Details", "transparent", COLORS[:deep_green], "transparent", 92, false, true],
    ["disabled-primary", "Indisponible", COLORS[:deep_green], COLORS[:cream], COLORS[:deep_green], 150, true, false],
    ["light-on-dark-reserver", "Reserver une experience", COLORS[:cream], COLORS[:deep_green], COLORS[:cream], 230, false, false],
    ["outline-on-dark-contacter", "Nous contacter", "transparent", COLORS[:cream], COLORS[:sage], 170, false, false]
  ]

  buttons.each do |name, label, fill, color, stroke, width, disabled, underline|
    write_file("11_boutons", "ethny-bouton-officiel-#{name}.svg", "Static Canva export from official Button component", source, button_svg(label, fill, color, stroke, width, disabled, underline))
  end
end

def card_shadow
  %(<defs><filter id="ethny-card-shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#1C3B34" flood-opacity="0.05"/><feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#1C3B34" flood-opacity="0.18"/></filter></defs>)
end

def write_frames
  source = File.join(DS_ROOT, "components/core/Card.jsx")
  frames = {
    "card-simple-cream" => svg(360, 240, card_shadow + %(<rect x="22" y="22" width="316" height="196" rx="14" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}" stroke-width="1" filter="url(#ethny-card-shadow)"/>), %(role="img" aria-label="ethny official card frame")),
    "card-service" => svg(360, 240, card_shadow + %(<rect x="22" y="22" width="316" height="196" rx="14" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}" stroke-width="1" filter="url(#ethny-card-shadow)"/><rect x="46" y="46" width="96" height="24" rx="3" fill="#{COLORS[:forest_tint_20]}"/><line x1="46" y1="102" x2="250" y2="102" stroke="#{COLORS[:deep_green]}" stroke-width="2"/><line x1="46" y1="130" x2="292" y2="130" stroke="#{COLORS[:stone]}" stroke-width="1"/><line x1="46" y1="154" x2="260" y2="154" stroke="#{COLORS[:stone]}" stroke-width="1"/>), %(role="img" aria-label="ethny official service card frame")),
    "panel-deep-green" => svg(360, 240, %(<rect width="360" height="240" rx="14" fill="#{COLORS[:deep_green]}"/><rect x="28" y="28" width="304" height="184" rx="10" fill="none" stroke="#{COLORS[:sage]}" stroke-opacity="0.38" stroke-width="1"/>), %(role="img" aria-label="ethny official deep green panel")),
    "media-frame" => svg(360, 240, %(<rect x="1" y="1" width="358" height="238" rx="14" fill="#{COLORS[:cream]}" stroke="#{COLORS[:stone]}" stroke-width="1"/><rect x="24" y="24" width="312" height="150" rx="10" fill="#{COLORS[:forest_tint_20]}"/><line x1="24" y1="204" x2="210" y2="204" stroke="#{COLORS[:deep_green]}" stroke-width="2"/>), %(role="img" aria-label="ethny official media frame"))
  }

  frames.each do |name, content|
    write_file("09_cadres", "ethny-cadre-officiel-#{name}.svg", "Static Canva export from official Card component", source, content)
  end
end

def write_separators
  signature_source = File.join(DS_ROOT, "guidelines/brand/signature-line.card.html")
  heading_source = File.join(DS_ROOT, "components/core/SectionHeading.jsx")
  rond = %(<circle cx="24" cy="24" r="15" stroke-dasharray="6 4"/>)
  curve = %(<path d="M10 20a14 14 0 0 1 28 0"/><path d="M10 30a14 14 0 0 0 28 0"/>)

  write_file(
    "08_separateurs",
    "ethny-separateur-officiel-signature-line.svg",
    "Static Canva export from official Signature Line card",
    signature_source,
    svg(700, 140, %(<rect width="700" height="140" fill="#{COLORS[:deep_green]}"/><g transform="translate(24 46)" fill="none" stroke="#{COLORS[:cream]}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">#{rond}</g><text x="94" y="68" fill="#{COLORS[:cream]}" font-family="Cormorant Garamond, serif" font-size="28" font-weight="500" letter-spacing="7">ETHNY</text><text x="94" y="98" fill="#{COLORS[:sage]}" font-family="Cormorant Garamond, serif" font-size="24" font-style="italic">Le monde a table.</text>), %(role="img" aria-label="ethny official signature line"))
  )

  write_file(
    "08_separateurs",
    "ethny-separateur-officiel-heading-light.svg",
    "Static Canva export from official SectionHeading component",
    heading_source,
    svg(700, 120, %(<rect width="700" height="120" fill="#{COLORS[:cream]}"/><text x="42" y="38" fill="#{COLORS[:sage]}" font-family="Jost, sans-serif" font-size="13" font-weight="500" letter-spacing="3" text-transform="uppercase">NOS SERVICES</text><line x1="42" y1="70" x2="280" y2="70" stroke="#{COLORS[:stone]}" stroke-width="1"/><g transform="translate(302 46)" fill="none" stroke="#{COLORS[:forest]}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">#{curve}</g>), %(role="img" aria-label="ethny official heading separator"))
  )

  write_file(
    "08_separateurs",
    "ethny-separateur-officiel-line-cream-on-green.svg",
    "Static Canva export from official Signature Line visual language",
    signature_source,
    svg(700, 72, %(<rect width="700" height="72" fill="#{COLORS[:deep_green]}"/><line x1="32" y1="36" x2="304" y2="36" stroke="#{COLORS[:sage]}" stroke-width="1"/><g transform="translate(326 12)" fill="none" stroke="#{COLORS[:cream]}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">#{rond}</g><line x1="396" y1="36" x2="668" y2="36" stroke="#{COLORS[:sage]}" stroke-width="1"/>), %(role="img" aria-label="ethny official centered separator"))
  )
end

def write_mockups
  badge_source = File.join(DS_ROOT, "components/core/badge-card.card.html")
  button_source = File.join(DS_ROOT, "components/core/buttons.card.html")
  section_source = File.join(DS_ROOT, "components/core/section-heading.card.html")
  testimonial_source = File.join(DS_ROOT, "components/feedback/testimonial.card.html")
  form_source = File.join(DS_ROOT, "components/forms/form-fields.card.html")

  write_file("13_mockups", "ethny-mockup-officiel-badge-card.svg", "Static Canva reference from official badge-card component card", badge_source, svg(700, 240, %(<rect width="700" height="240" fill="#{COLORS[:cream]}"/><rect x="22" y="22" width="656" height="196" rx="14" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}"/><rect x="46" y="46" width="110" height="28" rx="3" fill="#{COLORS[:deep_green]}"/><text x="101" y="64" text-anchor="middle" fill="#{COLORS[:cream]}" font-family="Jost, sans-serif" font-size="10" font-weight="500" letter-spacing="1.6">CHEF PRIVE</text><rect x="166" y="46" width="96" height="28" rx="3" fill="#{COLORS[:sage]}"/><text x="214" y="64" text-anchor="middle" fill="#{COLORS[:deep_green]}" font-family="Jost, sans-serif" font-size="10" font-weight="500" letter-spacing="1.6">TRAITEUR</text><text x="46" y="128" fill="#{COLORS[:deep_green]}" font-family="Cormorant Garamond, serif" font-size="30" font-weight="500">Chef a domicile</text><text x="46" y="160" fill="#{COLORS[:anthracite]}" opacity="0.68" font-family="Jost, sans-serif" font-size="14">Un chef vient cuisiner chez vous, du marche au dressage.</text>), %(role="img" aria-label="ethny official badge card mockup")))
  write_file("13_mockups", "ethny-mockup-officiel-buttons.svg", "Static Canva reference from official buttons component card", button_source, svg(700, 340, %(<rect width="700" height="340" fill="#{COLORS[:cream]}"/><g transform="translate(24 24)">#{button_svg("Demander une proposition", COLORS[:deep_green], COLORS[:cream], COLORS[:deep_green], 260).sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")}</g><g transform="translate(300 24)">#{button_svg("Voir les menus", COLORS[:sage], COLORS[:deep_green], COLORS[:sage], 180).sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")}</g><g transform="translate(496 24)">#{button_svg("En savoir plus", "transparent", COLORS[:deep_green], COLORS[:deep_green], 170).sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")}</g><rect x="24" y="190" width="652" height="96" rx="6" fill="#{COLORS[:deep_green]}"/><g transform="translate(44 214)">#{button_svg("Reserver une experience", COLORS[:cream], COLORS[:deep_green], COLORS[:cream], 230).sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")}</g><g transform="translate(292 214)">#{button_svg("Nous contacter", "transparent", COLORS[:cream], COLORS[:sage], 170).sub(/\A<svg[^>]*>/, "").sub(%r{</svg>\z}, "")}</g>), %(role="img" aria-label="ethny official buttons mockup")))
  write_file("13_mockups", "ethny-mockup-officiel-section-heading.svg", "Static Canva reference from official section heading component card", section_source, svg(700, 200, %(<rect width="350" height="200" fill="#{COLORS[:cream]}"/><rect x="350" width="350" height="200" fill="#{COLORS[:deep_green]}"/><text x="24" y="42" fill="#{COLORS[:sage]}" font-family="Jost, sans-serif" font-size="13" font-weight="500" letter-spacing="3">NOS SERVICES</text><text x="24" y="94" fill="#{COLORS[:deep_green]}" font-family="Cormorant Garamond, serif" font-size="36" font-weight="500">Une experience</text><text x="24" y="132" fill="#{COLORS[:deep_green]}" font-family="Cormorant Garamond, serif" font-size="36" font-weight="500">sur mesure</text><text x="374" y="48" fill="#{COLORS[:sage]}" font-family="Jost, sans-serif" font-size="13" font-weight="500" letter-spacing="3">TEMOIGNAGES</text><text x="374" y="104" fill="#{COLORS[:cream]}" font-family="Cormorant Garamond, serif" font-size="34" font-weight="500">Ce que nos hotes</text><text x="374" y="140" fill="#{COLORS[:cream]}" font-family="Cormorant Garamond, serif" font-size="34" font-weight="500">en disent</text>), %(role="img" aria-label="ethny official section heading mockup")))
  write_file("13_mockups", "ethny-mockup-officiel-testimonial.svg", "Static Canva reference from official testimonial component card", testimonial_source, svg(700, 220, %(<rect width="350" height="220" fill="#{COLORS[:cream]}"/><rect x="350" width="350" height="220" fill="#{COLORS[:deep_green]}"/><text x="28" y="74" fill="#{COLORS[:deep_green]}" font-family="Cormorant Garamond, serif" font-size="26" font-style="italic">Une soiree memorable,</text><text x="28" y="112" fill="#{COLORS[:deep_green]}" font-family="Cormorant Garamond, serif" font-size="26" font-style="italic">un chef d'une grande discretion.</text><text x="28" y="162" fill="#{COLORS[:sage]}" font-family="Jost, sans-serif" font-size="11" font-weight="500" letter-spacing="1.2">CAMILLE &amp; LOUIS - MARIAGE</text><text x="378" y="74" fill="#{COLORS[:cream]}" font-family="Cormorant Garamond, serif" font-size="26" font-style="italic">Un service impeccable,</text><text x="378" y="112" fill="#{COLORS[:cream]}" font-family="Cormorant Garamond, serif" font-size="26" font-style="italic">du marche au dressage.</text><text x="378" y="162" fill="#{COLORS[:sage]}" font-family="Jost, sans-serif" font-size="11" font-weight="500" letter-spacing="1.2">SOCIETE DELACROIX - BRUXELLES</text>), %(role="img" aria-label="ethny official testimonial mockup")))
  write_file("13_mockups", "ethny-mockup-officiel-form-fields.svg", "Static Canva reference from official form fields component card", form_source, svg(700, 340, %(<rect width="700" height="340" fill="#{COLORS[:cream]}"/><text x="24" y="42" fill="#{COLORS[:anthracite]}" font-family="Jost, sans-serif" font-size="13" font-weight="500">Votre nom</text><rect x="24" y="56" width="310" height="52" rx="6" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}"/><text x="42" y="88" fill="#{COLORS[:anthracite]}" opacity="0.45" font-family="Jost, sans-serif" font-size="14">Prenom et nom</text><text x="366" y="42" fill="#{COLORS[:anthracite]}" font-family="Jost, sans-serif" font-size="13" font-weight="500">Type d'experience</text><rect x="366" y="56" width="310" height="52" rx="6" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}"/><text x="384" y="88" fill="#{COLORS[:anthracite]}" opacity="0.72" font-family="Jost, sans-serif" font-size="14">Chef a domicile</text><path d="M650 78l7 7 7-7" fill="none" stroke="#{COLORS[:forest]}" stroke-width="1.5" stroke-linecap="round"/><text x="24" y="144" fill="#{COLORS[:anthracite]}" font-family="Jost, sans-serif" font-size="13" font-weight="500">Decrivez votre projet</text><rect x="24" y="158" width="652" height="142" rx="6" fill="#{COLORS[:white]}" stroke="#{COLORS[:stone_tint_40]}"/><text x="42" y="190" fill="#{COLORS[:anthracite]}" opacity="0.45" font-family="Jost, sans-serif" font-size="14">Occasion, nombre de convives, lieu, envies...</text>), %(role="img" aria-label="ethny official form fields mockup")))
end

def write_archive_readme
  path = File.join(ROOT, "14_archives", "README.md")
  FileUtils.mkdir_p(File.dirname(path))
  File.write(path, <<~MD)
    # Archives

    Dossier conserve pour les anciennes versions validees ou les exports remplaces.

    Ne pas uploader ce dossier dans Canva comme bibliotheque active.
    Les elements generes et rejetes sont volontairement conserves hors pack actif dans :

    `../canva-upload-svg-pack-rejected-generated/`
  MD
end

copy_official_logos
extract_icons
write_brand_motifs
write_signature_fields
write_contour_field
write_separators
write_frames
write_badges
write_buttons
write_mockups
write_archive_readme

CSV.open(File.join(ROOT, "00_documentation", "official-design-system-manifest.csv"), "w") do |csv|
  csv << ["folder", "filename", "label", "source"]
  MANIFEST.each { |row| csv << row }
end
