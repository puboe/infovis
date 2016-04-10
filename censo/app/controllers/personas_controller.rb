class PersonasController < ApplicationController
  before_action :set_persona, only: [:show, :edit, :update, :destroy]
  before_action :set_default_response_format, only: [:sex]

  # GET /personas
  # GET /personas.json
  def index
    @personas = Persona.all.limit(1000)
  end

  # GET /personas/1
  # GET /personas/1.json
  def show
  end

  # GET /personas/new
  def new
    @persona = Persona.new
  end

  # GET /personas/1/edit
  def edit
  end

  def sex
    if not (@males and @females)
      count = Persona.group(:P02).count
      @males = count[1]
      @females = count[2]
    end
    respond_to do |format|
      msg = { :males => @males, :females => @females }
      format.json  { render :json => msg }
    end
  end

  # POST /personas
  # POST /personas.json
  def create
    @persona = Persona.new(persona_params)
    delete_cache()
    respond_to do |format|
      if @persona.save
        format.html { redirect_to @persona, notice: 'Persona was successfully created.' }
        format.json { render :show, status: :created, location: @persona }
      else
        format.html { render :new }
        format.json { render json: @persona.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /personas/1
  # PATCH/PUT /personas/1.json
  def update
    delete_cache()
    respond_to do |format|
      if @persona.update(persona_params)
        format.html { redirect_to @persona, notice: 'Persona was successfully updated.' }
        format.json { render :show, status: :ok, location: @persona }
      else
        format.html { render :edit }
        format.json { render json: @persona.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /personas/1
  # DELETE /personas/1.json
  def destroy
    @persona.destroy
    delete_cache()
    respond_to do |format|
      format.html { redirect_to personas_url, notice: 'Persona was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_persona
      @persona = Persona.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def persona_params
      params.require(:persona).permit(:PERSONA_REF_ID, :HOGAR_REF_ID, :P01, :P02, :P03, :P05, :P06, :P07, :P12, :ADADAGRU, :EDADQUI, :P08, :P09, :P10, :CONDACT)
    end

    def set_default_response_format
      request.format = :json
    end

    def delete_cache
      @males = nil
      @females = nil
    end
end
