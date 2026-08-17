Rails.application.routes.draw do

  scope "(:locale)", locale: /pt-BR|en|es/ do
    root "universe#index"
  end

end