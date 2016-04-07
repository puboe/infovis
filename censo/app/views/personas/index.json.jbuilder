json.array!(@personas) do |persona|
  json.extract! persona, :id, :HOGAR_REF_ID, :P01, :P02, :P03, :P05, :P06, :P07, :P12, :EDADAGRU, :EDADQUI, :P08, :P09, :P10, :CONDACT
  json.url persona_url(persona, format: :json)
end
