defmodule CorexTest do
  use ExUnit.Case
  doctest Corex

  test "greets the world" do
    assert Corex.hello() == :world
  end
end
