require 'test_helper'

class PersonasControllerTest < ActionController::TestCase
  setup do
    @persona = personas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:personas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create persona" do
    assert_difference('Persona.count') do
      post :create, persona: { ADADAGRU: @persona.ADADAGRU, CONDACT: @persona.CONDACT, EDADQUI: @persona.EDADQUI, HOGAR_REF_ID: @persona.HOGAR_REF_ID, P01: @persona.P01, P02: @persona.P02, P03: @persona.P03, P05: @persona.P05, P06: @persona.P06, P07: @persona.P07, P08: @persona.P08, P09: @persona.P09, P10: @persona.P10, P12: @persona.P12, PERSONA_REF_ID: @persona.PERSONA_REF_ID }
    end

    assert_redirected_to persona_path(assigns(:persona))
  end

  test "should show persona" do
    get :show, id: @persona
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @persona
    assert_response :success
  end

  test "should update persona" do
    patch :update, id: @persona, persona: { ADADAGRU: @persona.ADADAGRU, CONDACT: @persona.CONDACT, EDADQUI: @persona.EDADQUI, HOGAR_REF_ID: @persona.HOGAR_REF_ID, P01: @persona.P01, P02: @persona.P02, P03: @persona.P03, P05: @persona.P05, P06: @persona.P06, P07: @persona.P07, P08: @persona.P08, P09: @persona.P09, P10: @persona.P10, P12: @persona.P12, PERSONA_REF_ID: @persona.PERSONA_REF_ID }
    assert_redirected_to persona_path(assigns(:persona))
  end

  test "should destroy persona" do
    assert_difference('Persona.count', -1) do
      delete :destroy, id: @persona
    end

    assert_redirected_to personas_path
  end
end
